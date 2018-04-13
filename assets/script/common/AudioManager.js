var AudioManager = cc.Class({
    name: "AudioManager",
    ctor: function () {
        this.bgmVolume = 1.0;
        this.sfxVolume = 1.0;
        this.bgmAudioID = -1;
        this.sfxAudioID = -1;
        this.soundPath = "resources/sound/";
        this.init();
    },

    init: function (soundPath = null) {
        if (soundPath != null)
            this.soundPath = soundPath;
        var t = cc.sys.localStorage.getItem("bgmVolume");
        if (t != null) {
            this.bgmVolume = parseFloat(t);
        }

        var t = cc.sys.localStorage.getItem("sfxVolume");
        if (t != null) {
            this.sfxVolume = parseFloat(t);
        }

        cc.game.on(cc.game.EVENT_HIDE, function () {
            cc.audioEngine.pauseAll();
        });

        cc.game.on(cc.game.EVENT_SHOW, function () {
            cc.audioEngine.resumeAll();
        });
    },

    getUrl: function (type, soundFile) {
        type = this._deelType(type);
        return cc.url.raw(this.soundPath + type + "/" + soundFile);
    },

    playSound(type, soundFile) {
        if (type == null || soundFile == null) return;
        var audioUrl = this.getUrl(type, soundFile);
        if (this.bgmAudioID >= 0) {
            cc.audioEngine.stop(this.bgmAudioID);
        }
        this.bgmAudioID = cc.audioEngine.play(audioUrl, true, this.bgmVolume);
    },

    playEffect(type, soundFile) {
        if (type == null || soundFile == null) return;
        var audioUrl = this.getUrl(type, soundFile);
        if (this.sfxVolume > 0) {
            var audioId = cc.audioEngine.play(audioUrl, false, this.sfxVolume);
        }
    },

    /**
     * 用于播放语音短语 不受设置音效限制
     */
    playChatEffect(type, soundFile) {
        if (type == null || soundFile == null) return;
        var audioUrl = this.getUrl(type, soundFile);
        if (this.sfxAudioID >= 0) {
            cc.audioEngine.stop(this.sfxAudioID);
        }
        this.sfxAudioID = cc.audioEngine.play(audioUrl, false, 1.0);
    },

    setSFXVolume: function (v) {
        if (this.sfxVolume != v) {
            cc.sys.localStorage.setItem("sfxVolume", v);
            this.sfxVolume = v;
        }
    },

    setBGMVolume: function (v, force) {
        if (this.bgmAudioID >= 0) {
            if (v > 0) {
                cc.audioEngine.resume(this.bgmAudioID);
            }
            else {
                cc.audioEngine.pause(this.bgmAudioID);
            }
        }
        if (this.bgmVolume != v || force) {
            cc.sys.localStorage.setItem("bgmVolume", v);
            this.bgmVolume = v;
            cc.audioEngine.setVolume(this.bgmAudioID, v);
        }
    },

    pauseAll: function () {
        cc.audioEngine.pauseAll();
    },

    resumeAll: function () {
        cc.audioEngine.resumeAll();
    },

    setBgmPause: function () {
        cc.audioEngine.pause(this.bgmAudioID);
    },

    setBgmResume: function () {
        cc.audioEngine.resume(this.bgmAudioID);
    },

    _deelType(type) {

        if (type == 'xzdd' || type == 'xlch' || type == 'ddh') {
            return 'hz'
        }
        return type;
    },
});

//声明对象
var AudioManager = new AudioManager();

module.exports = AudioManager;
