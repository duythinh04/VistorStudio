const multer=require('multer');
const path=require('path');


const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){

        const ext=path.extname(file.originalname);
        const postId=req.query.postId || 'unknown';
        const sectionId=req.query.sectionId || 'unknown';
        const order = req.query.order || '0';
        const timestamp=Date.now();
        
        const filename=`${postId}_${sectionId}_${order}_${timestamp}${ext}`;
          console.log("Saved filename:", filename);
        cb(null,filename);
    }
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ hỗ trợ ảnh (jpeg, jpg, png, gif)'));
  }
};

const upload = multer({storage,fileFilter});

module.exports = upload;    