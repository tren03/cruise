// initialize fuse objects needed for searching
import Fuse from "fuse.js"
import { availableColors } from "./colors"
import { fuseColorOptions } from "./fuseOpts"

export const fuseVariables = {
    fuseTab:null,
    fuseHistory:null,
    fuseTopSites:null,
    fuseBookmark:null,
    fuseColors:new Fuse(availableColors, fuseColorOptions),
}
