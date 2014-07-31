//These methods are called by the Brightcove video embed object:
//
//<param name="templateLoadHandler" value="BC.onTemplateLoad" />
//<param name="templateReadyHandler" value="BC.onTemplateReady" />

var BC = {};

BC.loaded = false;

BC.onTemplateLoad = function (experienceID) {
        //Create global references to the player and API Modules and Events
        BC.player = brightcove.api.getExperience(experienceID);
        BC.APIModules = brightcove.api.modules.APIModules;
        BC.adEvent = brightcove.api.events.AdEvent;
        BC.captionsEvent = brightcove.api.events.CaptionsEvent;
        BC.contentEvent = brightcove.api.events.ContentEvent;
        BC.cuePointEvent = brightcove.api.events.CuePointEvent;
        BC.mediaEvent = brightcove.api.events.MediaEvent;
};

BC.onTemplateReady = function () {
    if (!BC.loaded) {
        //Player Instance
        BC.videoPlayer = BC.player.getModule(BC.APIModules.VIDEO_PLAYER);
    }

    //Playlist data Instance
    BC.contentModule = BC.player.getModule(BC.APIModules.CONTENT);
    BC.playerReady();
};

BC.playerReady = function () {
    BC.loaded = true;
};