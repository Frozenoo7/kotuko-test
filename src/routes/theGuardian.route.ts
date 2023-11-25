import { Router } from "express";

import { getGuardianApisBySection } from "services/theGuardian.service";

const router = Router();

router.get("/the-guardian", getGuardianApisBySection);

export { router as sectionRoutes };
