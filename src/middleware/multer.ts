import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req: any, file, cb) => {
    cb(null, "uploads/avatars");
  },
  filename: (req: any, file, cb) => {
    cb(
      null,
      `${req.user.userID}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
export const upload = multer({ storage });
