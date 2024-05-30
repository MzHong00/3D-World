import { Router } from "express";
import { digitalZoneCrawling, firstReadingRoomCrawling, lapTopZoneCrawling, secondReadingRoomCrawling } from "../services/zoneSeatState";

const router = Router();

router.get('/seat-laptop', lapTopZoneCrawling);
router.get('/seat-digital', digitalZoneCrawling);
router.get('/seat-room1', firstReadingRoomCrawling);
router.get('/seat-room2', secondReadingRoomCrawling);

export default router;