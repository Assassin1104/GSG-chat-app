import { Router } from "express";
import authorizeUser from "../middleware/AuthMiddleware.js";
import { upload } from "../utils/multer.js";
import {
  createOrRetrieveChat,
  createOrRetrieveTeamChat,
  fetchChats,
  fetchTeamChats,
  fetchGroupChats,
  fetchDiscussChats,
  createGroupChat,
  createTeamChat,
  updateGroupDP,
  updateGroupName,
  removeUserFromGroup,
  addUsersToGroup,
  deleteGroupChat,
  makeGroupAdmin,
  dismissAsAdmin,
  deleteGroupDP,
} from "../controllers/ChatController.js";

const router = Router();

/*   Base route: /api/chat   */
router
  .route("/")
  .post(authorizeUser, createOrRetrieveChat)
  .get(authorizeUser, fetchChats);

// router
//   .route("/teams")
//   .post(authorizeUser, createOrRetrieveTeamChat)
//   .get(authorizeUser, fetchTeamChats);

router.post(
  "/group",
  authorizeUser,
  upload.single("displayPic"),
  createGroupChat
);

router.post(
  "/teams",
  authorizeUser,
  upload.single("displayPic"),
  createTeamChat
);

router
  .route("/members")
  .get(authorizeUser, fetchChats);

router
  .route("/teams")
  .get(authorizeUser, fetchTeamChats);

router
  .route("/groups")
  .get(authorizeUser, fetchGroupChats);

router
  .route("/discuss")
  .get(authorizeUser, fetchDiscussChats);

// router.post(
//   "/team",
//   authorizeUser,
//   upload.single("displayPic"),
//   createTeamChat
// );
// router.post(
//   "/discuss",
//   authorizeUser,
//   upload.single("displayPic"),
//   createGroupChat
// );
router.put("/group/delete-dp", authorizeUser, deleteGroupDP);
router.put(
  "/group/update-dp",
  authorizeUser,
  upload.single("displayPic"),
  updateGroupDP
);
router.put("/group/update-name", authorizeUser, updateGroupName);
router.put("/group/remove", authorizeUser, removeUserFromGroup);
router.post("/group/add", authorizeUser, addUsersToGroup);
router.put("/group/delete", authorizeUser, deleteGroupChat);
router.post("/group/make-admin", authorizeUser, makeGroupAdmin);
router.put("/group/dismiss-admin", authorizeUser, dismissAsAdmin);

export default router;
