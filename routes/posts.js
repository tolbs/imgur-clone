var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostError = require('../helpers/error/PostError');
const flash = require('express-flash');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/uploads");
    },
    filename: function(req, file, cb){
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});
var uploader = multer({storage: storage});

router.post('/createPost', uploader.single("uploadImage"), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.desc;
    let fk_userid = req.session.userid;

    //do server validation
    //ensure values are not undefined, mysql.query will return
    //BIND paramenters cannot be defined

    sharp(fileUploaded)
    .resize(200)
    .toFile(destinationOfThumbnail)
    .then(() => {
        let baseSQL = "INSERT INTO posts (title, description, photopath, thumbpath, created, fk_userid) VALUE (?, ?, ?, ?, now(), ?);";
        return db.execute(baseSQL, [title, description, fileUploaded, destinationOfThumbnail, fk_userid]);
    })
    .then(([results, fields]) => {
        if(results && results.affectedRows) {
            req.flash('success', "Your post was created successfully");
            res.redirect("/");
        }else {
            throw new PostError("Post could not be created.", "/postimage", 200);
        }
    })
    .catch((err) => {
        if(err instanceof PostError) {
            errorPrint(err.getMessage());
            flash('error', err.getMessage());
            res.status(err.getStatus());
            res.redirect(err.getRedirectURL());
        }else {
            next(err);
        }
    })
})

router.get('/search', (req, res, next) => {
    let searchTerm = req.query.search;
    if(!searchTerm) {
        res.send({
            resultsStatus: "info",
            message: "No search term given.",
            results: []
        });
    } else {
        let baseSQL = "SELECT id, title, description, thumbpath, concat_ws(' ', title, description) AS haystack \
        FROM posts \
        HAVING haystack like ?;";
        let sqlReadySearchTerm = "%"+searchTerm+"%";
        db.execute(baseSQL, [sqlReadySearchTerm])
        .then(([results, fields]) => {
            if(results && results.length) {
                res.send({
                    resultsStatus: "info",
                    message: `${results.length} results found.`,
                    results: results
                });
            } else {
                db.execute("SELECT id, title, description, thumbpath, created FROM posts ORDER BY created LIMIT 8", [])
                .then(([results, fields]) => {
                    res.send({
                        resultsStatus: "info",
                        message: "No results were found for your search but here are the 8 more recent posts.",
                        results: results
                    });
                })
            }
        })
        .catch((err) => next(err));
    }
})
module.exports = router;