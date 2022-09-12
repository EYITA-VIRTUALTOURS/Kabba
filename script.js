(function(){
    var script = {
 "mouseWheelEnabled": true,
 "layout": "absolute",
 "start": "this.playAudioList([this.audio_3D611975_0DA2_F040_41A8_C7FDBF4C1EDD]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "minHeight": 20,
 "id": "rootPlayer",
 "paddingLeft": 0,
 "vrPolyfillScale": 0.5,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "desktopMipmappingEnabled": false,
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.MapViewer",
  "this.HTMLText_77A45D69_68E7_70A0_4199_7C23092E161A",
  "this.HTMLText_77FFE780_68A3_305F_4195_72CF03F77028",
  "this.HTMLText_77D88A2F_68A3_30A2_41D9_6B88F2278A2E",
  "this.HTMLText_77A79D0B_68A3_3061_41C8_63D21A41AF16",
  "this.HTMLText_6E543D0E_7336_73F9_41CC_81437F6B71A3",
  "this.HTMLText_6E4F1BBF_7332_B618_41DB_D7FE4B0A76CD",
  "this.HTMLText_77824F54_68A3_30E7_41C8_29B1863B932A",
  "this.HTMLText_6D10649B_7332_5218_41D2_21101FE2809C"
 ],
 "minWidth": 20,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "mobileMipmappingEnabled": false,
 "class": "Player",
 "scripts": {
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "unregisterKey": function(key){  delete window[key]; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "registerKey": function(key, value){  window[key] = value; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "existsKey": function(key){  return key in window; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "defaultVRPointer": "laser",
 "height": "100%",
 "downloadEnabled": false,
 "gap": 10,
 "paddingTop": 0,
 "paddingRight": 0,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "overflow": "visible",
 "definitions": [{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 68.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_385A46D0_2C99_0BFC_41B1_CFBCE60C0E23",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -65.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3DFB4486_2C99_0E64_41C0_D65EB40200AC",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -153.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3834B6AC_2C99_0BA4_41A0_7C67FF749F63",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -41.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_385436C3_2C99_0BDC_41BC_E09B4FA04031",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -105.64,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_39B04239_2C99_0AAF_41C0_A9DC6067D54B",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_t.jpg",
 "label": "IMG_20220825_131811_00_518",
 "id": "panorama_F5ECBD01_FF39_267E_41D3_145261DB322E",
 "adjacentPanoramas": [
  {
   "yaw": 106.27,
   "backwardYaw": -95.34,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B"
  },
  {
   "yaw": -79.89,
   "backwardYaw": 106.64,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EB0441_FF39_26FE_41EC_E9764933A848"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1843489B_0219_3872_417D_E2176424A2EA",
  "this.overlay_1969D2AD_0219_2856_4153_AD6911A16674",
  "this.overlay_19D90D79_0219_18B1_4180_449620FDE574",
  "this.overlay_194EB99E_021B_3873_4152_5EDB6F359E07",
  "this.panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_tcap0"
 ]
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_t.jpg",
 "label": "IMG_20220825_115213_00_495",
 "id": "panorama_F58225F7_FF3B_E182_41EE_5523C7237D95",
 "adjacentPanoramas": [
  {
   "yaw": -120.71,
   "backwardYaw": -56.02,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38"
  },
  {
   "yaw": -27.51,
   "backwardYaw": 92.45,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8"
  },
  {
   "yaw": -161.66,
   "backwardYaw": -127.98,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71"
  },
  {
   "yaw": 146.59,
   "backwardYaw": -127.98,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_E1C75258_FF49_3502_41EB_469040BFA8A0",
  "this.overlay_DB8A29FF_FF37_16FF_41B9_1DDFDC2B066C",
  "this.overlay_1D916582_09CF_DFDA_418D_B65F55B15140",
  "this.overlay_1DDE5CD1_09D0_4D76_4183_C7B9C227DEC6",
  "this.overlay_119E6D0B_09D0_CCEA_41A0_E5A9EA29FC64",
  "this.overlay_1C5F270B_09D1_DCEA_4193_6D5BD9679D63",
  "this.overlay_11F0E92C_09D0_572E_4180_C8114B3E43D2",
  "this.panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -133.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_368292FD_2C99_0BA7_41C4_E070CD40CE99",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_t.jpg",
 "label": "IMG_20220825_134821_00_525",
 "id": "panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EB0784_FF39_2187_41EF_7C13A026372D"
  },
  {
   "yaw": -26.78,
   "backwardYaw": 114.05,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_F1FF0DE3_FF5B_2F06_41D9_FFA6427B5FDB",
  "this.overlay_F1B2AE62_FF59_2D06_41E1_FB1767DF8912",
  "this.overlay_EEFF73C7_FF4F_1B0E_41D1_C58D6842B54B",
  "this.panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0",
  "this.overlay_23FAD821_2C77_065C_41B3_F6D7596C543C"
 ]
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window18714"
 },
 "bodyPaddingRight": 5,
 "id": "window_00F793DD_1787_1B12_4151_6C4A3C478564",
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 300,
 "headerVerticalAlign": "middle",
 "minWidth": 20,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "bodyBackgroundOpacity": 1,
 "scrollBarVisible": "rollOver",
 "shadowVerticalLength": 0,
 "scrollBarOpacity": 0.5,
 "class": "Window",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "titlePaddingLeft": 5,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "veilColorRatios": [
  0,
  1
 ],
 "height": 200,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "modal": true,
 "shadow": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "paddingRight": 0,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "layout": "vertical",
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "minHeight": 20,
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "children": [
  "this.htmlText_00F573DE_1787_1B0E_41A6_B502D8C7191E"
 ],
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "borderRadius": 5,
 "shadowHorizontalLength": 3,
 "closeButtonPressedIconColor": "#FFFFFF",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_t.jpg",
 "label": "IMG_20220825_125931_00_509",
 "id": "panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1",
 "adjacentPanoramas": [
  {
   "yaw": -111.54,
   "backwardYaw": -127.5,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38"
  },
  {
   "yaw": 94.96,
   "backwardYaw": -117.31,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_15ED2950_0CFE_B040_41A3_B9A625214FC9",
  "this.overlay_1A445D72_0CFE_9041_41A2_D4D303A65715",
  "this.overlay_143F21DF_0CE1_907F_418D_67451AEE6971",
  "this.overlay_1492E473_0CE2_9047_4194_9BA2A603CB82",
  "this.panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_tcap0",
  "this.overlay_1D388A17_12C6_119F_4199_713CEA3E3C32"
 ]
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_t.jpg",
 "label": "IMG_20220825_131618_00_516",
 "id": "panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5",
 "adjacentPanoramas": [
  {
   "yaw": 49.87,
   "backwardYaw": 52.51,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2"
  },
  {
   "yaw": -143.95,
   "backwardYaw": 24.41,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EB0441_FF39_26FE_41EC_E9764933A848"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1D11EE39_026B_38B1_4172_3C11B1168A24",
  "this.overlay_205B82BD_0269_69B6_417E_C447E2ACD52F",
  "this.overlay_1DCF995A_0269_38F2_4180_FAD83E8B9E54",
  "this.overlay_20DC66B5_0268_E9B1_4175_EC8CFC0251FB",
  "this.panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_tcap0",
  "this.overlay_1C358800_129A_703E_41A8_F2C946D45BA0"
 ]
},
{
 "items": [
  {
   "media": "this.panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5E72603_FF39_2281_410D_D2CF25E55C50",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F582A940_FF3B_2EFE_41E9_44C71671137F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F581CE96_FF39_6382_41E7_E2755B74444F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F581CE96_FF39_6382_41E7_E2755B74444F_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F58225F7_FF3B_E182_41EE_5523C7237D95",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5EB0784_FF39_2187_41EF_7C13A026372D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5FE026B_FF39_2282_41B5_0F2204858344",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5FE026B_FF39_2282_41B5_0F2204858344_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5ECBD01_FF39_267E_41D3_145261DB322E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5EB0441_FF39_26FE_41EC_E9764933A848",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F581C873_FF39_6E82_41E5_2D1192608196",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F581C873_FF39_6E82_41E5_2D1192608196_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F581FFCB_FF39_6182_41E2_D6EB76625001",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F56890_FF39_6F9E_41BB_ED300D126577",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024",
   "camera": "this.panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_t.jpg",
 "label": "IMG_20220825_122308_00_497",
 "id": "panorama_F582A940_FF3B_2EFE_41E9_44C71671137F",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_E1D308CB_FF4B_1506_41E3_75C75AB5CB55",
  "this.overlay_E10EC96D_FF49_1703_41E2_C6A5B4FDBEB1",
  "this.panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 74.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A83A556_2C99_0EE5_41C6_5E88B876334B",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 112.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A1734AA_2C99_0FAC_41BD_CB776BE1A6CE",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 175.23,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_399F721E_2C99_0A64_4197_FEB226B966A5",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -59.79,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_39E47275_2C99_0AA4_41C1_5EE43AA1435E",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_t.jpg",
 "label": "IMG_20220825_125613_00_508",
 "id": "panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38",
 "adjacentPanoramas": [
  {
   "yaw": 77.46,
   "backwardYaw": 138.8,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36"
  },
  {
   "yaw": -127.5,
   "backwardYaw": -111.54,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_19FC51D0_0CE6_B041_4163_FF4CF42C45C0",
  "this.overlay_143E8516_0CE7_91C0_4180_283DCB816695",
  "this.overlay_1A5F80A8_0CE6_B0C1_4196_46807D0A4E8F",
  "this.overlay_1B937A7E_0CE1_9040_41A3_4D9028D74E9B",
  "this.panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_tcap0",
  "this.overlay_03DBEC1E_179F_2D11_41B4_BBE2A9B99001"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 149.23,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3ABB656E_2C99_0EA4_41B4_CF8DB3C2F8EC",
 "class": "PanoramaCamera"
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_3D611975_0DA2_F040_41A8_C7FDBF4C1EDD.mp3",
  "oggUrl": "media/audio_3D611975_0DA2_F040_41A8_C7FDBF4C1EDD.ogg",
  "class": "AudioResource"
 },
 "id": "audio_3D611975_0DA2_F040_41A8_C7FDBF4C1EDD",
 "data": {
  "label": "&#x1F9C8; Lofi (Royalty Free Music) - &quot;BUTTER&quot; by @LuKremBo &#x1F1F0;&#x1F1F7;"
 },
 "class": "MediaAudio"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_t.jpg",
 "label": "IMG_20220825_135849_00_532",
 "id": "panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B",
 "adjacentPanoramas": [
  {
   "yaw": -114.68,
   "backwardYaw": 59.29,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD"
  },
  {
   "yaw": 129.38,
   "backwardYaw": -70.72,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36"
  },
  {
   "yaw": -38.94,
   "backwardYaw": 89.94,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EB0784_FF39_2187_41EF_7C13A026372D"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_0EB9497D_01E9_18B1_4175_633D340286EF",
  "this.overlay_11E89235_01E8_E8B6_4152_FC634BA8A8FA",
  "this.overlay_0E0DC5D8_01E7_2BFE_4159_64D8B19BD568",
  "this.overlay_0E079B7D_01E7_18B6_416F_279630E03C10",
  "this.panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_tcap0",
  "this.overlay_06633C31_128B_F05F_41B2_169F086CFED9",
  "this.overlay_0627A36B_128A_D0C2_4182_BC44CBC38506"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 33.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_362892B2_2C99_0BBD_41AA_5BA0F1332328",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -14.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_39C6625C_2C99_0AE4_41BE_17524BADE0EE",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 52.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3DC6F449_2C99_0EEF_41BC_CF5AFC756805",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_t.jpg",
 "label": "IMG_20220825_134928_00_526",
 "id": "panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96",
 "adjacentPanoramas": [
  {
   "yaw": 114.05,
   "backwardYaw": -26.78,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156"
  },
  {
   "yaw": -45.72,
   "backwardYaw": -19.85,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EB0784_FF39_2187_41EF_7C13A026372D"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EB0784_FF39_2187_41EF_7C13A026372D"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_EC113BCF_FF3B_EB1E_41E8_851AC777E9EB",
  "this.overlay_EB52C5C2_FF3B_7F06_41EE_3FCA88748D61",
  "this.overlay_ECA95279_FF39_1503_41D8_5C079C9AB314",
  "this.overlay_ED900D42_FF39_2F06_41D0_B9FD5D0EC0DA",
  "this.overlay_EB5C629C_FF3F_1501_41C8_5E6AE6F010B2",
  "this.overlay_E957125C_FFD7_1502_41E8_A806B05DA206",
  "this.overlay_E73FB609_FFC9_3D02_41DF_575A1F327DC9",
  "this.panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_tcap0",
  "this.overlay_036F3FAC_179B_2B32_419D_A0D96923A8AD"
 ]
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_t.jpg",
 "label": "IMG_20220825_131539_00_515",
 "id": "panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1"
  },
  {
   "yaw": 52.51,
   "backwardYaw": 49.87,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5"
  },
  {
   "yaw": -112.42,
   "backwardYaw": 36.55,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2218E73F_026F_E8B1_4168_BAA4A44A6711",
  "this.overlay_236C03E8_026F_6FDE_417C_31493FF7D188",
  "this.overlay_2072A3C8_0269_6FDE_415A_5DBAA81A0C08",
  "this.overlay_23EBF596_0269_2873_4175_B376E1242C2C",
  "this.panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_tcap0",
  "this.overlay_1DB94355_12C6_7793_4192_E403CACEADEB"
 ]
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_t.jpg",
 "label": "IMG_20220825_141310_00_538",
 "id": "panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742",
 "adjacentPanoramas": [
  {
   "yaw": 107.77,
   "backwardYaw": 120.21,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8"
  },
  {
   "yaw": -106.14,
   "backwardYaw": -101.37,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024"
  },
  {
   "yaw": -4.77,
   "backwardYaw": -136.54,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_29D3C22A_0CA3_73C0_41A9_A0FADD7003E5",
  "this.overlay_29BCF9E2_0CA2_B041_419C_B0E91240900F",
  "this.overlay_2979DD02_0CA2_91C0_4178_9232DCD18ACA",
  "this.panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_tcap0",
  "this.overlay_39485CF3_0DA1_9040_4188_E7730649CAA4",
  "this.overlay_39C3EB43_0DA1_9040_4192_AFB9B112B820"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -57.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_37348376_2C99_0AA4_41BE_160C09B5300D",
 "class": "PanoramaCamera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window20114"
 },
 "bodyPaddingRight": 5,
 "id": "window_01067F26_1785_6B3E_41AA_5B1E5AE2091B",
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 300,
 "headerVerticalAlign": "middle",
 "minWidth": 20,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "bodyBackgroundOpacity": 1,
 "scrollBarVisible": "rollOver",
 "shadowVerticalLength": 0,
 "scrollBarOpacity": 0.5,
 "class": "Window",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "titlePaddingLeft": 5,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "veilColorRatios": [
  0,
  1
 ],
 "height": 200,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "modal": true,
 "shadow": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "paddingRight": 0,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "layout": "vertical",
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "minHeight": 20,
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "children": [
  "this.htmlText_01042F26_1785_6B3E_41A3_4AD6A7494439"
 ],
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "borderRadius": 5,
 "shadowHorizontalLength": 3,
 "closeButtonPressedIconColor": "#FFFFFF",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -50.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_36C01335_2C99_0AA7_41BD_6AFA9C022378",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 123.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A0BB4CD_2C99_0FE7_41BD_2D8AAE45A200",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 160.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3B8B0643_2C99_0AE3_41BE_3D88A9EC82A4",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -87.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_397351D2_2C99_09FC_4194_BB3146074F23",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_t.jpg",
 "label": "IMG_20220825_123206_00_501",
 "id": "panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C"
  },
  {
   "yaw": 0.13,
   "backwardYaw": 21.61,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104"
  },
  {
   "yaw": -100.11,
   "backwardYaw": -139.55,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_E430214F_FF49_171E_41EF_232CEEC3471B",
  "this.overlay_E5552A18_FF49_F502_41DD_F499097CF636",
  "this.overlay_E4192837_FF4B_150F_41EC_8B3D51CBFADD",
  "this.overlay_E32F5B63_FF49_2B06_41CB_4EA362AD0FED",
  "this.overlay_E03B02B6_FF49_350E_41D1_89E35A9709C1",
  "this.overlay_E03EFA70_FF4B_1502_41D4_56FE361EE955",
  "this.panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 112.92,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_36A27315_2C99_0A67_41A1_3C6E34A28273",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -139.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3BE0B689_2C99_0A6C_41C3_11466B03A1A9",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_t.jpg",
 "label": "IMG_20220825_131916_00_519",
 "id": "panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B",
 "adjacentPanoramas": [
  {
   "yaw": 94.71,
   "backwardYaw": -121.34,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E"
  },
  {
   "yaw": -95.34,
   "backwardYaw": 106.27,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5ECBD01_FF39_267E_41D3_145261DB322E"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1BB2E50A_0229_2852_4171_C1A6C865F894",
  "this.overlay_188B5662_0229_28D2_4161_94FC3A034751",
  "this.overlay_1BAF9E01_0227_184E_4161_2BB5E56F7209",
  "this.overlay_1840B10A_0227_2852_4175_1A8637B31D8F",
  "this.panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -179.87,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A630529_2C99_0EAF_41B5_7EF986D7E5AC",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 125.61,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_36E6934D_2C99_0AE7_41B0_5B56FF910702",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_t.jpg",
 "label": "IMG_20220825_130011_00_510",
 "id": "panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5",
 "adjacentPanoramas": [
  {
   "yaw": -117.31,
   "backwardYaw": 94.96,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1B21F2EF_0CE3_B040_41A3_F167E1D66066",
  "this.overlay_14F3DF70_0CE3_9041_4199_5A63E0D1E046",
  "this.panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_tcap0",
  "this.overlay_03C9F41B_1785_1D17_41B6_9FB7464E076A"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -85.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_376ED3C6_2C99_09E4_41B0_B6EB78131C0F",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 125.61,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3714F35C_2C99_0AE5_41C0_03372FCE235C",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_t.jpg",
 "label": "IMG_20220825_141841_00_540",
 "id": "panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024",
 "adjacentPanoramas": [
  {
   "yaw": -101.37,
   "backwardYaw": -106.14,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_tcap0",
  "this.overlay_3FF5134C_0C61_9040_41A1_07B7E37A2391",
  "this.overlay_39772289_0C62_B0C0_41A5_C3E1153CF1B6",
  "this.overlay_3FBE74F4_0C63_9040_41A8_A23331120A6D",
  "this.overlay_39E31725_0C63_91C0_4165_07F2DFECFE36",
  "this.overlay_3935D994_0C62_90C1_415C_904EEDABEF84"
 ]
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_t.jpg",
 "label": "IMG_20220825_135304_00_529",
 "id": "panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41",
 "adjacentPanoramas": [
  {
   "yaw": -54.39,
   "backwardYaw": 124.73,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5E72603_FF39_2281_410D_D2CF25E55C50"
  },
  {
   "yaw": 48.49,
   "backwardYaw": -136.66,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_E85D5D3B_FFF9_6F07_41D6_55552E85C315",
  "this.overlay_E5DD4C03_FFFA_ED06_41EB_D42A7359B2C1",
  "this.overlay_E6F0AA34_FFF9_F502_41DA_23651A767CFE",
  "this.overlay_E7785FDB_FFF9_6B06_41ED_401668077244",
  "this.panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 165.68,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A5D74FB_2C99_0FAC_41B2_AE02BA84B82E",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 84.66,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_379923D2_2C99_09FC_41AD_193D6C211D08",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 43.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_361AF28D_2C99_0A64_41C3_125EFB9F62A1",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -155.59,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3B3EF5E8_2C99_09AC_41BB_918B21A3CA4A",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_t.jpg",
 "label": "IMG_20220825_135631_00_531",
 "id": "panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD",
 "adjacentPanoramas": [
  {
   "yaw": -19.85,
   "backwardYaw": -45.72,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96"
  },
  {
   "yaw": -103.75,
   "backwardYaw": -17.46,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5E72603_FF39_2281_410D_D2CF25E55C50"
  },
  {
   "yaw": 59.29,
   "backwardYaw": -114.68,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_EC9DEACE_FF3B_F501_41E5_13F74E7D124A",
  "this.overlay_EB2B548F_FF3B_7D1E_41EF_A8A66778989A",
  "this.overlay_E9335AE4_FF39_1502_41E4_F0D2A0E71E96",
  "this.overlay_E845A761_FF37_3B03_41D4_00577A8254A5",
  "this.overlay_EAF4AE4F_FFC9_6D1E_419B_4D44AC2FADD2",
  "this.overlay_EAE05920_FFC9_3702_41C4_108C857F0D0F",
  "this.panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 62.69,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3DC2F459_2C99_0EEC_4192_105AB26FEB7B",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -131.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A7F451D_2C99_0E67_41C2_D61BD8D363F3",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 52.02,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A2B34F0_2C99_0FBC_418E_70923A7FE162",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -71.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_360AB299_2C99_0A6C_41C5_DFA49AB3E96C",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 73.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_37048368_2C99_0AAC_4181_9D5707AE0FE9",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_t.jpg",
 "label": "IMG_20220825_132747_00_521",
 "id": "panorama_F581C873_FF39_6E82_41E5_2D1192608196",
 "adjacentPanoramas": [
  {
   "yaw": 22.99,
   "backwardYaw": -85.04,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F581FFCB_FF39_6182_41E2_D6EB76625001"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A"
  },
  {
   "yaw": -74.99,
   "backwardYaw": 165.43,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EB0441_FF39_26FE_41EC_E9764933A848"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_10D250E0_0C9E_9040_417E_71C82D3DE870",
  "this.overlay_13E48E2E_0C9F_93C1_4143_C1E438B67980",
  "this.overlay_122BFD14_0C9F_71C1_4194_84A5C0F71C66",
  "this.overlay_124BBAEC_0CA1_9041_4158_84F12D91B6BC",
  "this.overlay_13D84CF5_0CA1_F043_41A7_59E66B2D2697",
  "this.overlay_12B55702_0CA3_B1C0_4194_1B5894DAA553",
  "this.panorama_F581C873_FF39_6E82_41E5_2D1192608196_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 162.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3DF4F46F_2C99_0EA4_41C6_439E07B3643A",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 153.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3B85B638_2C99_0AAD_419C_4EA9F994C2A6",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 141.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_36B2E307_2C99_0A63_418C_6740E38D22BA",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_t.jpg",
 "label": "IMG_20220825_130650_00_512",
 "id": "panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4",
 "adjacentPanoramas": [
  {
   "yaw": 74.36,
   "backwardYaw": 122.64,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38"
  },
  {
   "yaw": -95.34,
   "backwardYaw": -103.88,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_158DCCAF_0CE1_B0C0_41A3_7361D38E89D0",
  "this.overlay_10E4420C_0CE2_B3C0_4179_BCF9D7E77E61",
  "this.overlay_16237C57_0CE2_9040_4198_473B4DD16FDF",
  "this.overlay_16C78D09_0CE3_B1C3_41A5_1255355A22C3",
  "this.panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_tcap0"
 ]
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_t.jpg",
 "label": "IMG_20220825_122143_00_496",
 "id": "panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8",
 "adjacentPanoramas": [
  {
   "yaw": -113.55,
   "backwardYaw": -146.96,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F582A940_FF3B_2EFE_41E9_44C71671137F"
  },
  {
   "yaw": 84.66,
   "backwardYaw": -42.96,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_E3A97C4D_FF4F_ED02_41B4_80871D640698",
  "this.overlay_E33B2936_FF4F_770E_41E5_5397A093F6A6",
  "this.overlay_E2731514_FF77_1F02_41C1_DEA13ED93A3A",
  "this.overlay_E20098BD_FF79_3503_41ED_B6DC2CBF62CF",
  "this.overlay_E198D65C_FF49_1D01_41E6_8C376C8BB6B9",
  "this.overlay_E1B06576_FF4F_1F0E_41E5_B5F700D49BA3",
  "this.panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_tcap0",
  "this.overlay_07F73D45_17BB_EF73_41B5_EAB87DA29E3B",
  "this.overlay_0639459B_1785_1F17_41AC_33AC0E1112DE"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -158.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_372AF38F_2C99_0A64_41C6_E020BAF7FAFB",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -85.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A1F04B4_2C99_0FA5_41C5_E75E14C1D37D",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_t.jpg",
 "label": "IMG_20220825_135139_00_528",
 "id": "panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104",
 "adjacentPanoramas": [
  {
   "yaw": -11.18,
   "backwardYaw": -14.32,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C"
  },
  {
   "yaw": -67.58,
   "backwardYaw": -19.35,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC"
  },
  {
   "yaw": -33.04,
   "backwardYaw": 118.07,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0"
  },
  {
   "yaw": -136.66,
   "backwardYaw": 48.49,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41"
  },
  {
   "yaw": 21.61,
   "backwardYaw": 0.13,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_E7C7CFC2_FFC9_6B06_41EC_9B42E860595D",
  "this.overlay_E6741CAF_FFCB_2D1E_41D6_2B971E778D14",
  "this.overlay_E745B8A6_FFCF_1501_41C7_3B0EBF2424B8",
  "this.overlay_E66BE5D2_FFC9_1F01_41EF_CC4A22315273",
  "this.overlay_E7355D83_FFC9_2F07_41CE_13EACB139F4C",
  "this.overlay_E6974A6A_FFC9_7506_41DD_D0378E25AE7A",
  "this.overlay_E709C0A9_FFCB_1502_41DD_BF0CFE10DD33",
  "this.overlay_E63FE5E1_FFCB_1F02_41E6_84803E41141A",
  "this.overlay_E68B5220_FFCA_F502_41E5_3D6F4923C07F",
  "this.overlay_E6CC868A_FF49_7D06_41DC_D531E419854C",
  "this.overlay_E728A4F0_FF4B_1D01_41E0_E64A76579FEA",
  "this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -71.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3638D2A6_2C99_0BA4_41B9_8C989E17B9B9",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 109.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3B1515BA_2C99_09AC_41BE_705C1EF05E68",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_t.jpg",
 "label": "IMG_20220825_114923_00_494",
 "id": "panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38",
 "adjacentPanoramas": [
  {
   "yaw": -56.02,
   "backwardYaw": -120.71,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F58225F7_FF3B_E182_41EE_5523C7237D95"
  },
  {
   "yaw": 35.17,
   "backwardYaw": 151.74,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1C7EF1AB_09D7_D72A_4181_81E16EDA0046",
  "this.overlay_1EAA6443_09D0_5D5B_4192_140C9A7CD289",
  "this.overlay_1FA0CC4A_09D0_CD6A_4165_407B015F169D",
  "this.overlay_1EC0B63B_09D0_5D2B_4176_734613D38E29",
  "this.panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_t.jpg",
 "label": "IMG_20220825_130503_00_511",
 "id": "panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38",
 "adjacentPanoramas": [
  {
   "yaw": 122.64,
   "backwardYaw": 74.36,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4"
  },
  {
   "yaw": -1.3,
   "backwardYaw": -61.94,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EB0441_FF39_26FE_41EC_E9764933A848"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_14EC7E06_0CE1_73C1_4181_CB5199DA1723",
  "this.overlay_16824197_0CE6_90C0_41A5_DFF3E8CE9D1A",
  "this.overlay_159B2F58_0CE7_9040_4198_076C0D18302F",
  "this.overlay_15BB71DD_0CE1_9043_41A1_901BC011A198",
  "this.panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 76.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_36F6E341_2C99_0ADF_41C4_DE4E19D08B63",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_t.jpg",
 "label": "IMG_20220825_144834_00_542",
 "id": "panorama_F5FE026B_FF39_2282_41B5_0F2204858344",
 "adjacentPanoramas": [
  {
   "yaw": -24.24,
   "backwardYaw": -67.08,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C"
  },
  {
   "yaw": 129.76,
   "backwardYaw": 61.8,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_109E218B_022B_E852_4180_5FA72D9736DD",
  "this.overlay_17AE5928_0228_F85F_4178_02919FF21DBD",
  "this.overlay_1518F8C5_023F_39D6_4164_A296A47029F4",
  "this.overlay_1A433FE6_0238_F7D2_4164_1665B8234FC2",
  "this.panorama_F5FE026B_FF39_2282_41B5_0F2204858344_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 58.66,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_364EE2CD_2C99_0BE4_41AA_C49EA26B851E",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_t.jpg",
 "label": "IMG_20220825_140046_00_533",
 "id": "panorama_F5EB0784_FF39_2187_41EF_7C13A026372D",
 "adjacentPanoramas": [
  {
   "yaw": -92.45,
   "backwardYaw": 46.6,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC"
  },
  {
   "yaw": 89.94,
   "backwardYaw": -38.94,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_0E8EA230_01E9_284F_4150_39DCEAA4D128",
  "this.overlay_11F050AD_01EB_E856_4136_967B5F615FC6",
  "this.overlay_0E11B049_01E9_28DE_4143_5BA5F2A23AFD",
  "this.overlay_0E1A75EA_01E9_6BD2_4173_00E3BE872532",
  "this.panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_tcap0"
 ]
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window29046"
 },
 "bodyPaddingRight": 5,
 "id": "window_E765417E_FFCF_17FE_41DF_8EED84DCE410",
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 300,
 "headerVerticalAlign": "middle",
 "minWidth": 20,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "bodyBackgroundOpacity": 1,
 "scrollBarVisible": "rollOver",
 "shadowVerticalLength": 0,
 "scrollBarOpacity": 0.5,
 "class": "Window",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "titlePaddingLeft": 5,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "veilColorRatios": [
  0,
  1
 ],
 "height": 200,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.4vmin",
 "modal": true,
 "shadow": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "paddingRight": 0,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "layout": "vertical",
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "minHeight": 20,
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "children": [
  "this.htmlText_E76B017E_FFCF_17FE_41E6_1B349F51464F"
 ],
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "borderRadius": 5,
 "shadowHorizontalLength": 3,
 "closeButtonPressedIconColor": "#FFFFFF",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_t.jpg",
 "label": "IMG_20220825_131455_00_514",
 "id": "panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36",
 "adjacentPanoramas": [
  {
   "yaw": 138.8,
   "backwardYaw": 77.46,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38"
  },
  {
   "yaw": 36.55,
   "backwardYaw": -112.42,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2"
  },
  {
   "yaw": -70.72,
   "backwardYaw": 129.38,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_23F1F86F_026B_38D1_4174_EDF0BCAF864E",
  "this.overlay_26D08991_026B_184E_4168_AE78D2C15297",
  "this.overlay_24B2A298_0269_287E_416F_34EF08B3E8CC",
  "this.overlay_27BD9C0A_0269_3853_4161_0469CABDF2FF",
  "this.overlay_180859EB_0CA2_9040_41A7_92AD4B861D34",
  "this.overlay_19D11526_0CE1_B1C0_4196_AD0BDEFA4380",
  "this.panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_tcap0"
 ]
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_t.jpg",
 "label": "IMG_20220825_135448_00_530",
 "id": "panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC",
 "adjacentPanoramas": [
  {
   "yaw": -19.35,
   "backwardYaw": -67.58,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_E0DE279C_FF59_1B02_41E0_2B0917708254",
  "this.overlay_DE87B9DA_FF5B_7706_41DF_6C794F219CB5",
  "this.panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 55.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A0674C1_2C99_0FDE_41B7_5F36A212E2FF",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 40.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_375B339B_2C99_0A6C_41C3_9F8BDD92FE52",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_t.jpg",
 "label": "IMG_20220825_134443_00_524",
 "id": "panorama_F581CE96_FF39_6382_41E7_E2755B74444F",
 "adjacentPanoramas": [
  {
   "yaw": 92.45,
   "backwardYaw": 73.61,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_E0BEDBEC_FF5F_EB01_41E0_89A818E0A9A9",
  "this.overlay_DFC19158_FF5E_F702_41E6_B47D1983D700",
  "this.panorama_F581CE96_FF39_6382_41E7_E2755B74444F_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 137.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3658E2BF_2C99_0BA4_41BC_236FC241F729",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_t.jpg",
 "label": "IMG_20220825_114312_00_491",
 "id": "panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8",
 "adjacentPanoramas": [
  {
   "yaw": 92.45,
   "backwardYaw": -27.51,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F58225F7_FF3B_E182_41EE_5523C7237D95"
  },
  {
   "yaw": -42.96,
   "backwardYaw": 84.66,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_DF536162_FF4B_1706_41E9_5DBE19D74F6A",
  "this.overlay_DF1D189E_FF4B_153E_41DB_587FC7604461",
  "this.overlay_DDDB6F5A_FF49_6B06_41D6_82CB9248FDBE",
  "this.overlay_12EE7DAC_09F0_4F2D_4187_FDD9174E7BFD",
  "this.panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 168.82,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3967C1E8_2C99_09AD_41BF_5FEAA6218048",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 94.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_39D61251_2C99_0AFC_41B6_B5E5AE616AE8",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 155.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3AB74562_2C99_0EDD_41BE_DF44F34105E2",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -73.73,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_367E52DA_2C99_0BEC_41C4_ECCCD27D088D",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_t.jpg",
 "label": "IMG_20220825_144752_00_541",
 "id": "panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C",
 "adjacentPanoramas": [
  {
   "yaw": 40.07,
   "backwardYaw": -105.51,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC"
  },
  {
   "yaw": -67.08,
   "backwardYaw": -24.24,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE026B_FF39_2282_41B5_0F2204858344"
  },
  {
   "yaw": -130.38,
   "backwardYaw": -30.77,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_128B0FEB_09F0_4B2B_419B_702ECCC5CA1B",
  "this.overlay_13863286_09F3_F5DD_41A2_E52FC2D68533",
  "this.overlay_124C3BD9_09F0_4B76_41A0_DC8749ACDC4B",
  "this.overlay_156B1852_09F0_D57A_4151_9E5885E440A2",
  "this.overlay_24F4041B_0CBE_97C7_419E_6AF7CFDD4BF3",
  "this.overlay_2EC5FC1F_0CA1_97FF_41A3_4FA78BD81C25",
  "this.panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 49.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3968F207_2C99_0A64_41A1_15F45A2D16D1",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_t.jpg",
 "label": "IMG_20220825_141653_00_539",
 "id": "panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8",
 "adjacentPanoramas": [
  {
   "yaw": 120.21,
   "backwardYaw": 107.77,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2A8BCD82_0CA6_B0C0_4190_B5099F725DF9",
  "this.overlay_2B7FECF3_0CA6_B047_416C_5B030D326B2B",
  "this.panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_tcap0",
  "this.overlay_01746767_1785_3B3E_41B6_68C73E902CB8"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -44.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3AAC857A_2C99_0EAC_419F_D398BA811FDA",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -105.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3AC18590_2C99_0E7D_41C3_DF1B7C61A524",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -118.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_36D04326_2C99_0AA5_41C6_2263320F9322",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -143.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_377973B5_2C99_09A4_418B_84702BAD2543",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 146.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3AF1259C_2C99_0E65_4173_C9591D19CD0E",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_t.jpg",
 "label": "IMG_20220825_122635_00_498",
 "id": "panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C",
 "adjacentPanoramas": [
  {
   "yaw": -146.96,
   "backwardYaw": -113.55,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F582A940_FF3B_2EFE_41E9_44C71671137F"
  },
  {
   "yaw": 73.61,
   "backwardYaw": 92.45,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F581CE96_FF39_6382_41E7_E2755B74444F"
  },
  {
   "yaw": -14.32,
   "backwardYaw": -11.18,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_E4BD7A25_FF59_7502_41EA_7AD440D14BC8",
  "this.overlay_E4567C35_FF59_2D02_41A8_C1C0499BDD42",
  "this.overlay_E41FE2CD_FF59_1502_41E4_58915321C18A",
  "this.overlay_E4148E91_FF5B_2D03_41E0_DA62496D5BDD",
  "this.overlay_E4415295_FF5B_7502_41DC_29DB4ABA25D3",
  "this.overlay_E44B5EC3_FF5B_2D06_41ED_0AF41A95AF15",
  "this.overlay_115AD6B3_09D1_BD3B_415C_24D291A468DF",
  "this.overlay_10CFB141_09D0_B756_4194_C18B419FE5FA",
  "this.panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_tcap0"
 ]
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_t.jpg",
 "label": "IMG_20220825_130834_00_513",
 "id": "panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34",
 "adjacentPanoramas": [
  {
   "yaw": -103.88,
   "backwardYaw": -95.34,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_154AA596_0CE2_90C0_417B_DC1BBD16260F",
  "this.overlay_102DAA6E_0CE2_9040_419F_5089CEE95A76",
  "this.panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 87.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_38165697_2C99_0A64_41A7_4EABBEAC37F1",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 65.32,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3DFD047A_2C99_0EAC_41C6_41C75EBFAAAB",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_t.jpg",
 "label": "IMG_20220825_123502_00_503",
 "id": "panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82",
 "adjacentPanoramas": [
  {
   "yaw": 127.87,
   "backwardYaw": 108.4,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0"
  },
  {
   "yaw": -140.18,
   "backwardYaw": 108.4,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_tcap0",
  "this.overlay_034054B1_129D_F05E_41A2_3EE7A2634B38",
  "this.overlay_0144B691_129A_505E_4194_52CEB6F31EA7",
  "this.overlay_06020263_129A_B0C2_417A_791A103E2B9C"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 118.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_39A02245_2C99_0AE4_41BF_BE385182E344",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -144.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A996542_2C99_0EDD_41C4_935479313EB4",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -72.23,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3B2C75F5_2C99_09A4_41B4_C377FA23CFF0",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 134.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3DC85463_2C99_0EDC_41C5_4136611B3A5D",
 "class": "PanoramaCamera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window11809"
 },
 "bodyPaddingRight": 5,
 "id": "window_02CED149_179D_1773_41A2_0980F630CF1A",
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 300,
 "headerVerticalAlign": "middle",
 "minWidth": 20,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "bodyBackgroundOpacity": 1,
 "scrollBarVisible": "rollOver",
 "shadowVerticalLength": 0,
 "scrollBarOpacity": 0.5,
 "class": "Window",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "titlePaddingLeft": 5,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "veilColorRatios": [
  0,
  1
 ],
 "height": 200,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "modal": true,
 "shadow": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "paddingRight": 0,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "layout": "vertical",
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "minHeight": 20,
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "children": [
  "this.htmlText_02CCF14E_179D_170E_41AB_153BB5437FFA"
 ],
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "borderRadius": 5,
 "shadowHorizontalLength": 3,
 "closeButtonPressedIconColor": "#FFFFFF",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_t.jpg",
 "label": "IMG_20220825_132521_00_520",
 "id": "panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E",
 "adjacentPanoramas": [
  {
   "yaw": -121.34,
   "backwardYaw": 94.71,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B"
  },
  {
   "yaw": 26.55,
   "backwardYaw": -124.61,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1A456073_0227_E8B2_4153_CBF266E55DBB",
  "this.overlay_1BDACC2B_0229_7852_4173_C793D7888FB2",
  "this.overlay_1BBBF46A_0229_28D2_4169_63526AB437EC",
  "this.overlay_1C4D1399_022B_687E_417A_2BF05E0E47C5",
  "this.panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 105.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3B66C623_2C99_0AA3_416D_676A51A34297",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -55.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_366CC2E7_2C99_0BA4_41C1_5601844D33AC",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_t.jpg",
 "label": "IMG_20220825_131659_00_517",
 "id": "panorama_F5EB0441_FF39_26FE_41EC_E9764933A848",
 "adjacentPanoramas": [
  {
   "yaw": 24.41,
   "backwardYaw": -143.95,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5"
  },
  {
   "yaw": -61.94,
   "backwardYaw": -1.3,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38"
  },
  {
   "yaw": 106.64,
   "backwardYaw": -79.89,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5ECBD01_FF39_267E_41D3_145261DB322E"
  },
  {
   "yaw": 165.43,
   "backwardYaw": -74.99,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F581C873_FF39_6E82_41E5_2D1192608196"
  },
  {
   "yaw": -160.15,
   "backwardYaw": -74.99,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F581C873_FF39_6E82_41E5_2D1192608196"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1EE806F9_0219_E9BE_4141_529AE28F8C8A",
  "this.overlay_23B2DA32_0269_78B2_416F_563237330E2C",
  "this.overlay_1C2F3C32_0269_78B2_4138_39CCF2A71514",
  "this.overlay_1D53939F_026B_2871_4125_2C3AA9984224",
  "this.overlay_17ABF096_0CE1_70C0_41A7_2BC2CE8F2505",
  "this.overlay_17D52562_0CE7_F041_41A0_FFFBAFB05535",
  "this.overlay_1713285D_0CE3_9043_4181_F723C49B4AD1",
  "this.overlay_17BEFE9E_0CE2_90C1_4193_55B1F0561FFB",
  "this.overlay_10ED50E1_0CE2_F040_41A1_416A6E8E9F70",
  "this.panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_tcap0"
 ]
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_t.jpg",
 "label": "IMG_20220825_123412_00_502",
 "id": "panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0",
 "adjacentPanoramas": [
  {
   "yaw": 108.4,
   "backwardYaw": 127.87,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82"
  },
  {
   "yaw": -139.55,
   "backwardYaw": -100.11,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_tcap0",
  "this.overlay_03A455CA_129E_D3C2_418B_1F44560DF21B",
  "this.overlay_059BFDE4_14D2_8749_41AD_D011DDBFC904",
  "this.overlay_05F2A37D_14D1_8335_41AD_2BB31DF3CA49",
  "this.overlay_071D9F33_14CE_84CE_41AE_0B2F52662884"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -120.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3AE475AA_2C99_09AC_41AD_D406CFC0E90D",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -52.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3DE10491_2C99_0E7C_41C4_2AD3D7ED214E",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -87.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A3C74DA_2C99_0FEC_41C4_726A332CDED4",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -90.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3B1A45CA_2C99_09EC_41AD_197EAE813CCC",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 105.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3B94E62E_2C99_0AA5_41A2_7EA4164F8E1C",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 155.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3982022D_2C99_0AA7_41C3_54FC167C338F",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -127.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3B09E5D8_2C99_09EC_41C1_00AE4D969D3B",
 "class": "PanoramaCamera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window7372"
 },
 "bodyPaddingRight": 5,
 "id": "window_0295844A_1785_3D71_41AF_B35BF57028E3",
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 300,
 "headerVerticalAlign": "middle",
 "minWidth": 20,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "bodyBackgroundOpacity": 1,
 "scrollBarVisible": "rollOver",
 "shadowVerticalLength": 0,
 "scrollBarOpacity": 0.5,
 "class": "Window",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "titlePaddingLeft": 5,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "veilColorRatios": [
  0,
  1
 ],
 "height": 200,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "modal": true,
 "shadow": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "paddingRight": 0,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "layout": "vertical",
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "minHeight": 20,
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "children": [
  "this.htmlText_0295E44A_1785_3D71_4153_76B49FBB3BBF"
 ],
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "borderRadius": 5,
 "shadowHorizontalLength": 3,
 "closeButtonPressedIconColor": "#FFFFFF",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_t.jpg",
 "label": "IMG_20220825_133643_00_523",
 "id": "panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F581FFCB_FF39_6182_41E2_D6EB76625001"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EB0441_FF39_26FE_41EC_E9764933A848"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2CF2191E_0CA2_91C0_41A5_A6ADBA298389",
  "this.overlay_2D93A152_0CA3_F040_41A8_EFE27C53870B",
  "this.overlay_2C1526E5_0CA3_7040_41A7_19759B966580",
  "this.overlay_2C92FCC2_0CA2_B040_418A_E3E9D10135B8",
  "this.panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_tcap0",
  "this.overlay_03DA20E1_1785_F532_4192_923BEEE6DE7F"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 36.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3B5DB600_2C99_0A5C_41B4_7D3879006728",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 152.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3BB8364F_2C99_0AE3_41BC_3C15BB31A267",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 67.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3BCD8672_2C99_0ABC_41A5_3F7DAF5A3DDC",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_t.jpg",
 "label": "IMG_20220825_145706_00_545",
 "id": "panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0",
 "adjacentPanoramas": [
  {
   "yaw": 118.07,
   "backwardYaw": -33.04,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_E18EFF23_FF57_2B06_41DF_8E22A2E227D2",
  "this.overlay_E0AB8398_FF57_1B02_41CD_0571F0A3A65A",
  "this.panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 52.02,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A2624E5_2C99_0FA4_41BD_0AEA9A8FFE80",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -73.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3898073B_2C99_0AAC_41C2_4A6F153A7CC3",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 66.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_394901BB_2C99_09A3_41C1_9B08A4FF7A50",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_t.jpg",
 "label": "IMG_20220825_135047_00_527",
 "id": "panorama_F5E72603_FF39_2281_410D_D2CF25E55C50",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96"
  },
  {
   "yaw": -17.46,
   "backwardYaw": -103.75,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD"
  },
  {
   "yaw": 124.73,
   "backwardYaw": -54.39,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41"
  },
  {
   "yaw": -150.98,
   "backwardYaw": -54.39,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_E95977A3_FFCB_1B06_41E2_1970B2B6AD06",
  "this.overlay_E9E6092C_FFC9_7702_41B1_5B25AFB25E4C",
  "this.overlay_E8F6D31F_FFC9_1B3E_41ED_90771D56D3CF",
  "this.overlay_E94680C5_FFCF_3502_41E2_8E561DACB48D",
  "this.overlay_E9163482_FFCF_3D06_41C0_A0F70CB8ABD3",
  "this.overlay_E9FC3BDC_FFCF_2B02_41D5_6CC7D919E89A",
  "this.overlay_E7B4027B_FFFF_1506_41CD_594383504EBE",
  "this.overlay_E717144D_FFF9_1D02_41EC_60776BEFCE16",
  "this.panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_camera",
 "class": "PanoramaCamera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window3874"
 },
 "bodyPaddingRight": 5,
 "id": "window_1D1348C0_129A_B03E_41A5_909AAB9E57B3",
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 300,
 "headerVerticalAlign": "middle",
 "minWidth": 20,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "bodyBackgroundOpacity": 1,
 "scrollBarVisible": "rollOver",
 "shadowVerticalLength": 0,
 "scrollBarOpacity": 0.5,
 "class": "Window",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "titlePaddingLeft": 5,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "veilColorRatios": [
  0,
  1
 ],
 "height": 200,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "modal": true,
 "shadow": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "paddingRight": 0,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "layout": "vertical",
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "minHeight": 20,
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "children": [
  "this.htmlText_1D1578C0_129A_B03E_4196_C965F1BBC656"
 ],
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "borderRadius": 5,
 "shadowHorizontalLength": 3,
 "closeButtonPressedIconColor": "#FFFFFF",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 100.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3B71D618_2C99_0A6D_41BA_C921F21D34EC",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -95.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3BAF865B_2C99_0AEC_41C3_B2027B0AEB1A",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_t.jpg",
 "label": "IMG_20220825_140903_00_536",
 "id": "panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4",
 "adjacentPanoramas": [
  {
   "yaw": 129.38,
   "backwardYaw": 135.53,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F56890_FF39_6F9E_41BB_ED300D126577"
  },
  {
   "yaw": -142.57,
   "backwardYaw": 135.53,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F56890_FF39_6F9E_41BB_ED300D126577"
  },
  {
   "yaw": -24.12,
   "backwardYaw": 74.74,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_29D9F18A_0CAF_90C1_41A3_7924D0FB8A43",
  "this.overlay_2826236A_0CAE_B041_4180_66CA34CC4EE6",
  "this.overlay_2A6C48D2_0CA1_7040_41A3_5648E161FB04",
  "this.overlay_28699E27_0CA1_B3C0_419A_2939153B51CD",
  "this.overlay_29C9A930_0CA2_91C0_41A6_CC21BAB063F4",
  "this.panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_camera",
 "class": "PanoramaCamera"
},
{
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "touchControlMode": "drag_rotation",
 "displayPlaybackBar": true,
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 84.66,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3868971F_2C99_0A64_41B5_1C0511606AF2",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 43.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_369CB2F1_2C99_0BBF_415D_0893A254FF94",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -44.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3AD28584_2C99_0E65_41C4_D4D00BD473D8",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_t.jpg",
 "label": "IMG_20220825_132950_00_522",
 "id": "panorama_F581FFCB_FF39_6182_41E2_D6EB76625001",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EB0441_FF39_26FE_41EC_E9764933A848"
  },
  {
   "yaw": -85.04,
   "backwardYaw": 22.99,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F581C873_FF39_6E82_41E5_2D1192608196"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_11235A0D_0CA2_93C0_41A3_DE1690A97B52",
  "this.overlay_13EA657D_0CA1_9040_41A0_F9AA034AB803",
  "this.overlay_135BA117_0CA6_91C0_4197_35BABF94B2F0",
  "this.overlay_133D1AF4_0CA7_9040_4188_AF27A7B9BAE3",
  "this.panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -157.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3806A6A1_2C99_0A5C_41C3_E7C5EA46019A",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F581CE96_FF39_6382_41E7_E2755B74444F_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_t.jpg",
 "label": "IMG_20220825_141113_00_537",
 "id": "panorama_F5F56890_FF39_6F9E_41BB_ED300D126577",
 "adjacentPanoramas": [
  {
   "yaw": 135.53,
   "backwardYaw": 129.38,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2F724C7A_0CA1_9040_4191_44420D0395EA",
  "this.overlay_2B87D74C_0CAE_F040_4199_DA03B6C1FCB7",
  "this.panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_tcap0",
  "this.overlay_01766914_1785_1711_41B2_8943F6595C13"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -61.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A4BA511_2C99_0E7F_41B5_4B4D7E0F6D82",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_t.jpg",
 "label": "IMG_20220825_140659_00_535",
 "id": "panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB",
 "adjacentPanoramas": [
  {
   "yaw": -30.77,
   "backwardYaw": -130.38,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C"
  },
  {
   "yaw": -136.54,
   "backwardYaw": -4.77,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742"
  },
  {
   "yaw": 74.74,
   "backwardYaw": -24.12,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2D69E456_0CA2_9041_419F_DEF03A4DD1C1",
  "this.overlay_2E34CDDB_0CA1_9047_418B_BD8913E26014",
  "this.overlay_2E5763E3_0CA2_9047_41A0_11C8B0D67A03",
  "this.overlay_2D3B1157_0CA2_9040_419D_ABD01079701A",
  "this.overlay_2FADBC9B_0CA3_90C0_4189_098D9402B8FD",
  "this.overlay_2F089316_0CA3_91C0_41A4_98C72F1CAE84",
  "this.panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -50.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_382476B7_2C99_0BA4_41C3_2F26B168D9F9",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 160.65,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A410506_2C99_0E65_41B3_569C5545A791",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 79.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3DEED49E_2C99_0E64_41B0_62FFF56402DE",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_t.jpg",
 "label": "IMG_20220825_114651_00_493",
 "id": "panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71",
 "adjacentPanoramas": [
  {
   "yaw": -127.98,
   "backwardYaw": -161.66,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F58225F7_FF3B_E182_41EE_5523C7237D95"
  },
  {
   "yaw": 151.74,
   "backwardYaw": 35.17,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1FFB39B4_09D1_B73D_4182_61025A0EBF6F",
  "this.overlay_1F0DD58E_09D0_DFED_41A3_14227C2B22D4",
  "this.overlay_1F3F236B_09D0_5B2B_4160_DA24EC4D1772",
  "this.overlay_1F681347_09D0_5B5A_417C_4C1A2D28E176",
  "this.panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 76.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_373AE382_2C99_0A5C_41B4_33E90ED9C710",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_t.jpg",
 "label": "IMG_20220825_145056_00_543",
 "id": "panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A",
 "adjacentPanoramas": [
  {
   "yaw": -124.61,
   "backwardYaw": 26.55,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E"
  },
  {
   "yaw": 61.8,
   "backwardYaw": 129.76,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5FE026B_FF39_2282_41B5_0F2204858344"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_15CD63E4_023B_2FD6_4160_891233A13A04",
  "this.overlay_1A786F4C_0239_18D6_4166_24CDF666802B",
  "this.overlay_1B4DFF92_0239_1873_4166_540C39CB3EC7",
  "this.overlay_1B7FAEEF_0239_79D1_4161_9B166A581908",
  "this.panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -50.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3BF3067F_2C99_0AA4_41BB_9D9E5037A32E",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_camera",
 "class": "PanoramaCamera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window17486"
 },
 "bodyPaddingRight": 5,
 "id": "window_008E0B83_1785_6BF7_41AB_6E6C4D1A3160",
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 300,
 "headerVerticalAlign": "middle",
 "minWidth": 20,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "bodyBackgroundOpacity": 1,
 "scrollBarVisible": "rollOver",
 "shadowVerticalLength": 0,
 "scrollBarOpacity": 0.5,
 "class": "Window",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "titlePaddingLeft": 5,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "veilColorRatios": [
  0,
  1
 ],
 "height": 200,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "modal": true,
 "shadow": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "paddingRight": 0,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "layout": "vertical",
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "minHeight": 20,
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "children": [
  "this.htmlText_00883B83_1785_6BF7_41A9_ACE3312FB6FB"
 ],
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "borderRadius": 5,
 "shadowHorizontalLength": 3,
 "closeButtonPressedIconColor": "#FFFFFF",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_camera",
 "class": "PanoramaCamera"
},
{
 "backgroundColorRatios": [],
 "data": {
  "name": "Window9802"
 },
 "bodyPaddingRight": 5,
 "id": "window_0266479B_179B_1B17_41A8_E0F1A4B35CEB",
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "scrollBarColor": "#000000",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 300,
 "headerVerticalAlign": "middle",
 "minWidth": 20,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "bodyBackgroundOpacity": 1,
 "scrollBarVisible": "rollOver",
 "shadowVerticalLength": 0,
 "scrollBarOpacity": 0.5,
 "class": "Window",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "titlePaddingLeft": 5,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "veilColorRatios": [
  0,
  1
 ],
 "height": 200,
 "titleFontColor": "#000000",
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "modal": true,
 "shadow": true,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "paddingRight": 0,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "layout": "vertical",
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "minHeight": 20,
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "children": [
  "this.htmlText_0268679B_179B_1B17_41A5_3CF3FF4BE50A"
 ],
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "borderRadius": 5,
 "shadowHorizontalLength": 3,
 "closeButtonPressedIconColor": "#FFFFFF",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5FE026B_FF39_2282_41B5_0F2204858344_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_t.jpg",
 "label": "IMG_20220825_140412_00_534",
 "id": "panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC",
 "adjacentPanoramas": [
  {
   "yaw": -105.51,
   "backwardYaw": 40.07,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C"
  },
  {
   "yaw": 46.6,
   "backwardYaw": -92.45,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F5EB0784_FF39_2187_41EF_7C13A026372D"
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_1311F24C_0229_28D6_417B_1174D06C74E6",
  "this.overlay_137112A6_022F_2853_40EB_C82CE272D480",
  "this.overlay_107FD52C_0229_2856_417F_9447627EDA96",
  "this.overlay_1404A2DF_09F1_B56A_4154_D12FA6EA3EA9",
  "this.panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -106.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_39F4E269_2C99_0AAC_41C2_9E80269ADDD6",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -102.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3BDCA666_2C99_0AA4_41B4_A63BBB09D5FB",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F581C873_FF39_6E82_41E5_2D1192608196_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 178.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3B40C60B_2C99_0A63_4192_40B71CF9F7E4",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 78.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_36146281_2C99_0A5C_41C5_7430E4E5EEF1",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -130.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_374B33A8_2C99_09AC_41C3_9E4271E0740F",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 59.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_387466ED_2C99_0BA4_4190_297C8469CB54",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 18.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_3A957536_2C99_0EA5_41B3_3F2675758CD8",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -28.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_387B8708_2C99_0A6C_41C3_7FED0B84E1AE",
 "class": "PanoramaCamera"
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "paddingLeft": 0,
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "minWidth": 100,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 0.5,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipFontSize": "13px",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "class": "ViewerArea",
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 7,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "shadow": false,
 "progressBarBorderSize": 6,
 "height": "100%",
 "progressBarBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0.8,
 "progressLeft": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Georgia",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "minHeight": 50,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 55,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 7,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 10,
 "toolTipDisplayTime": 600,
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "layout": "absolute",
 "propagateClick": true,
 "minHeight": 1,
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "right": "0%",
 "width": 115.05,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "class": "Container",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "verticalAlign": "top",
 "height": 641,
 "shadow": false,
 "gap": 10,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "horizontalAlign": "left",
 "data": {
  "name": "--SETTINGS"
 }
},
{
 "layout": "absolute",
 "propagateClick": true,
 "minHeight": 1,
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "left": "0%",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundImageUrl": "skin/Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48.png",
 "class": "Container",
 "bottom": 0,
 "contentOpaque": false,
 "verticalAlign": "top",
 "height": 118,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "backgroundOpacity": 0.64,
 "borderRadius": 0,
 "paddingRight": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "horizontalAlign": "left",
 "data": {
  "name": "--MENU"
 }
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Floor Plan"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "left": "0.06%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "paddingLeft": 0,
 "toolTipBorderColor": "#767676",
 "width": "24.125%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "minWidth": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 0.5,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipFontSize": "13px",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "class": "ViewerArea",
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 7,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "shadow": false,
 "progressBarBorderSize": 6,
 "height": "37.622%",
 "progressBarBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0.8,
 "progressLeft": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Georgia",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "minHeight": 1,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "bottom": "7.14%",
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 7,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 10,
 "toolTipDisplayTime": 600,
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "visible": false,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "propagateClick": false,
 "minHeight": 1,
 "id": "HTMLText_77A45D69_68E7_70A0_4199_7C23092E161A",
 "left": "2.23%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "width": 110,
 "minWidth": 1,
 "borderSize": 3,
 "scrollBarVisible": "rollOver",
 "borderColor": "#000000",
 "top": "4.76%",
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "height": 47,
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingRight": 10,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;font-family:'Montserrat';\"><B>ENTRANCE</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "Entrance"
 }
},
{
 "propagateClick": false,
 "minHeight": 1,
 "id": "HTMLText_77FFE780_68A3_305F_4195_72CF03F77028",
 "left": "2.11%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 3,
 "scrollBarVisible": "rollOver",
 "borderColor": "#000000",
 "top": "5.19%",
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "height": "5.081%",
 "shadow": false,
 "width": "7.901%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingRight": 10,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:15px;font-family:'Montserrat';\"><B>Living Room</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "Living Room"
 }
},
{
 "propagateClick": false,
 "minHeight": 1,
 "id": "HTMLText_77D88A2F_68A3_30A2_41D9_6B88F2278A2E",
 "left": "2.11%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 3,
 "scrollBarVisible": "rollOver",
 "borderColor": "#000000",
 "top": "5.19%",
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "height": "4.973%",
 "shadow": false,
 "width": "4.946%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingRight": 10,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:15px;font-family:'Montserrat';\"><B>Kitchen</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "Kitchen"
 }
},
{
 "propagateClick": false,
 "minHeight": 1,
 "id": "HTMLText_77A79D0B_68A3_3061_41C8_63D21A41AF16",
 "left": "2.11%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 3,
 "scrollBarVisible": "rollOver",
 "borderColor": "#000000",
 "top": "5.19%",
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "height": "4.432%",
 "shadow": false,
 "width": "6.996%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingRight": 10,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:15px;font-family:'Montserrat';\"><B>Bedroom 1</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "Bedroom 1"
 }
},
{
 "propagateClick": false,
 "minHeight": 1,
 "id": "HTMLText_6E543D0E_7336_73F9_41CC_81437F6B71A3",
 "left": "2.11%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 3,
 "scrollBarVisible": "rollOver",
 "borderColor": "#000000",
 "top": "5.19%",
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "height": "4.432%",
 "shadow": false,
 "width": "6.996%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingRight": 10,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:15px;font-family:'Montserrat';\"><B>Bedroom 2</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "Bedroom 2"
 }
},
{
 "propagateClick": false,
 "minHeight": 1,
 "id": "HTMLText_6E4F1BBF_7332_B618_41DB_D7FE4B0A76CD",
 "left": "2.11%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 3,
 "scrollBarVisible": "rollOver",
 "borderColor": "#000000",
 "top": "5.19%",
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "height": "4.432%",
 "shadow": false,
 "width": "6.996%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingRight": 10,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:15px;font-family:'Montserrat';\"><B>Bedroom 3</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "Bedroom 3"
 }
},
{
 "propagateClick": false,
 "minHeight": 1,
 "id": "HTMLText_77824F54_68A3_30E7_41C8_29B1863B932A",
 "left": "2.11%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 3,
 "scrollBarVisible": "rollOver",
 "borderColor": "#000000",
 "top": "5.19%",
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "height": "6.811%",
 "shadow": false,
 "width": "12.364%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingRight": 10,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:15px;font-family:'Montserrat';\"><B>Bathroom</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "Bathroom"
 }
},
{
 "propagateClick": false,
 "minHeight": 1,
 "id": "HTMLText_6D10649B_7332_5218_41D2_21101FE2809C",
 "left": "2.11%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 3,
 "scrollBarVisible": "rollOver",
 "borderColor": "#000000",
 "top": "5.19%",
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "height": "6.811%",
 "shadow": false,
 "width": "12.364%",
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingRight": 10,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:15px;font-family:'Montserrat';\"><B>Hallway</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "Hallway"
 }
},
{
 "transparencyActive": true,
 "horizontalAlign": "center",
 "propagateClick": true,
 "minHeight": 1,
 "maxWidth": 58,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "paddingLeft": 0,
 "width": 58,
 "minWidth": 1,
 "borderSize": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "mode": "toggle",
 "height": 58,
 "shadow": false,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton FULLSCREEN"
 }
},
{
 "transparencyActive": true,
 "horizontalAlign": "center",
 "propagateClick": true,
 "minHeight": 1,
 "maxWidth": 58,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "paddingLeft": 0,
 "width": 58,
 "minWidth": 1,
 "borderSize": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "mode": "toggle",
 "height": 58,
 "shadow": false,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton MUTE"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B, this.camera_3868971F_2C99_0A64_41B5_1C0511606AF2); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1843489B_0219_3872_417D_E2176424A2EA",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0_HS_0_1_1_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -180,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0_HS_0_2_2_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0_HS_0_3_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0_HS_0_4_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.89,
   "image": "this.AnimatedImageResource_2474D8F5_0279_39B6_417A_51D8183B3E44",
   "pitch": -17.4,
   "yaw": 104.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1969D2AD_0219_2856_4153_AD6911A16674",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.89,
   "yaw": 104.06,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0_HS_1_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5EB0441_FF39_26FE_41EC_E9764933A848, this.camera_3898073B_2C99_0AAC_41C2_4A6F153A7CC3); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_19D90D79_0219_18B1_4180_449620FDE574",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -180,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0_HS_2_2_2_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0_HS_2_3_3_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0_HS_2_4_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0_HS_2_5_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.85,
   "image": "this.AnimatedImageResource_247408F6_0279_39B2_4169_0E488F421C9F",
   "pitch": -18.78,
   "yaw": -76.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_194EB99E_021B_3873_4152_5EDB6F359E07",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.85,
   "yaw": -76.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0_HS_3_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8, this.camera_3A3C74DA_2C99_0FEC_41C4_726A332CDED4); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E1C75258_FF49_3502_41EB_469040BFA8A0",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 108.01,
   "yaw": -27.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 104,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.08,
   "image": "this.AnimatedImageResource_1883FA1B_0239_7871_4175_E19CC5D5E5FF",
   "pitch": -3.47,
   "yaw": -53.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_DB8A29FF_FF37_16FF_41B9_1DDFDC2B066C",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.08,
   "yaw": -53.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.47,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71, this.camera_3A2624E5_2C99_0FA4_41BD_0AEA9A8FFE80); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1D916582_09CF_DFDA_418D_B65F55B15140",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 35.93,
   "yaw": -161.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0_HS_2_1_0_map.gif",
      "width": 122,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_15911B1F_09D0_D4EA_4197_E7FAD8FEE9ED",
   "pitch": -1.7,
   "yaw": -165.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DDE5CD1_09D0_4D76_4183_C7B9C227DEC6",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": -165.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71, this.camera_3A2B34F0_2C99_0FBC_418E_70923A7FE162); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_119E6D0B_09D0_CCEA_41A0_E5A9EA29FC64",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 67.98,
   "yaw": 146.59,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0_HS_4_1_0_map.gif",
      "width": 132,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.54,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38, this.camera_3A0BB4CD_2C99_0FE7_41BD_2D8AAE45A200); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1C5F270B_09D1_DCEA_4193_6D5BD9679D63",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 45.35,
   "yaw": -120.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0_HS_5_1_0_map.gif",
      "width": 151,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.48,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_1592FB02_09F0_D4DA_416F_D6D9DA45A92A",
   "pitch": -3.06,
   "yaw": -120.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_11F0E92C_09D0_572E_4180_C8114B3E43D2",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": -120.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0_HS_6_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96, this.camera_3DFB4486_2C99_0E64_41C0_D65EB40200AC); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_F1FF0DE3_FF5B_2F06_41D9_FFA6427B5FDB",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 58.91,
   "yaw": -26.78,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 175,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_EF1F1D9D_FF49_2F03_41DD_17CFDC83B314",
   "pitch": -2.13,
   "yaw": -28.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_F1B2AE62_FF59_2D06_41E1_FB1767DF8912",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -28.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.13,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_EEFF73C7_FF4F_1B0E_41D1_C58D6842B54B",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 92.81,
   "yaw": -108.43,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 145,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.27,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0_HS_4_0.png",
      "width": 97,
      "height": 130,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.72,
   "yaw": -100.02
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_23FAD821_2C77_065C_41B3_F6D7596C543C",
 "data": {
  "label": "Arrow Blue Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.5,
   "yaw": -100.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 21,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.72,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "propagateClick": false,
 "minHeight": 0,
 "id": "htmlText_00F573DE_1787_1B0E_41A6_B502D8C7191E",
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText",
 "width": "100%",
 "scrollBarMargin": 2,
 "height": "100%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\">Welcome to Aim Ultra </SPAN></SPAN></DIV><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\">Education Consultancy</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18715"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38, this.camera_3DC6F449_2C99_0EEF_41BC_CF5AFC756805); this.mainPlayList.set('selectedIndex', 32)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_15ED2950_0CFE_B040_41A3_B9A625214FC9",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 115.26,
   "yaw": -111.54,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 186,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_2522E94A_0C62_F040_4182_3746B907C728",
   "pitch": -2.44,
   "yaw": -108.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1A445D72_0CFE_9041_41A2_D4D303A65715",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -108.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.44,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5, this.camera_3DC2F459_2C99_0EEC_4192_105AB26FEB7B); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_143F21DF_0CE1_907F_418D_67451AEE6971",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 114.08,
   "yaw": 94.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 183,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_2523B94A_0C62_F040_41A8_C643C6AC975E",
   "pitch": -1.08,
   "yaw": 65.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1492E473_0CE2_9047_4194_9BA2A603CB82",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": 65.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D388A17_12C6_119F_4199_713CEA3E3C32",
 "data": {
  "label": "Polygon"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 54.11,
   "yaw": -14.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0_HS_4_1_0_map.gif",
      "width": 136,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.89,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5EB0441_FF39_26FE_41EC_E9764933A848, this.camera_3B3EF5E8_2C99_09AC_41BB_918B21A3CA4A); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1D11EE39_026B_38B1_4172_3C11B1168A24",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 81.7,
   "yaw": -143.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0_HS_0_1_0_map.gif",
      "width": 122,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.64,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.52,
   "image": "this.AnimatedImageResource_247648FC_0279_39B6_417B_69BE74C10EBD",
   "pitch": -21.92,
   "yaw": -142.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_205B82BD_0269_69B6_417E_C447E2ACD52F",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 11.52,
   "yaw": -142.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0_HS_1_0_6_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2, this.camera_3B09E5D8_2C99_09EC_41C1_00AE4D969D3B); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1DCF995A_0269_38F2_4180_FAD83E8B9E54",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0_HS_2_2_1_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0_HS_2_3_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0_HS_2_4_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.09,
   "image": "this.AnimatedImageResource_247788FD_0279_39B6_4180_95FD4E0871A4",
   "pitch": -18.77,
   "yaw": 36.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_20DC66B5_0268_E9B1_4175_EC8CFC0251FB",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.09,
   "yaw": 36.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0_HS_3_0_6_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_1D1348C0_129A_B03E_41A5_909AAB9E57B3, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.53,
   "image": "this.AnimatedImageResource_0653D490_14B1_85CA_41A4_F4391CFD9D9F",
   "pitch": 2.32,
   "yaw": -54.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C358800_129A_703E_41A8_F2C946D45BA0",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.53,
   "yaw": -54.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0_HS_4_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E1D308CB_FF4B_1506_41E3_75C75AB5CB55",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 66.26,
   "yaw": 94.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 158,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.39,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.13,
   "image": "this.AnimatedImageResource_18847A1C_0239_7877_4158_A2D9E7431F6C",
   "pitch": 4.27,
   "yaw": 70.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E10EC96D_FF49_1703_41E2_C6A5B4FDBEB1",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.13,
   "yaw": 70.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.27,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36, this.camera_385436C3_2C99_0BDC_41BC_E09B4FA04031); this.mainPlayList.set('selectedIndex', 29)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_19FC51D0_0CE6_B041_4163_FF4CF42C45C0",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 89.51,
   "yaw": 77.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 190,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_255DB949_0C62_F040_41A1_FC7C4E159FD2",
   "pitch": 2.75,
   "yaw": 71.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_143E8516_0CE7_91C0_4180_283DCB816695",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": 71.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1, this.camera_385A46D0_2C99_0BFC_41B1_CFBCE60C0E23); this.mainPlayList.set('selectedIndex', 33)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1A5F80A8_0CE6_B0C1_4196_46807D0A4E8F",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 107.17,
   "yaw": -127.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0_HS_2_1_0_map.gif",
      "width": 156,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_25220949_0C62_F040_418F_A27DE9C6D09E",
   "pitch": -0.86,
   "yaw": -148.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1B937A7E_0CE1_9040_41A3_4D9028D74E9B",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": -148.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.86,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_02CED149_179D_1773_41A2_0980F630CF1A, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.16,
   "image": "this.AnimatedImageResource_0FF5C4ED_1785_3D33_41B2_F218B859B30C",
   "pitch": 2.52,
   "yaw": -6.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_03DBEC1E_179F_2D11_41B4_BBE2A9B99001",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.16,
   "yaw": -6.27,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.52,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD, this.camera_3AE475AA_2C99_09AC_41AD_D406CFC0E90D); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_0EB9497D_01E9_18B1_4175_633D340286EF",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 97.66,
   "yaw": -114.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0_HS_0_1_0_map.gif",
      "width": 189,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.68,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5EB0784_FF39_2187_41EF_7C13A026372D, this.camera_3B1A45CA_2C99_09EC_41AD_197EAE813CCC); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_11E89235_01E8_E8B6_4152_FC634BA8A8FA",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 107.98,
   "yaw": -38.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0_HS_1_1_0_map.gif",
      "width": 173,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.62,
   "image": "this.AnimatedImageResource_1885EA1D_0239_7871_4145_0152AC990E61",
   "pitch": -17.9,
   "yaw": -44.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_0E0DC5D8_01E7_2BFE_4159_64D8B19BD568",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.62,
   "yaw": -44.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0_HS_2_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.9,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_18858A1D_0239_7871_416F_0289D46C3D14",
   "pitch": -2.35,
   "yaw": -123.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_0E079B7D_01E7_18B6_416F_279630E03C10",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": -123.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36, this.camera_3B1515BA_2C99_09AC_41BE_705C1EF05E68); this.mainPlayList.set('selectedIndex', 29)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_06633C31_128B_F05F_41B2_169F086CFED9",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 89.49,
   "yaw": 129.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0_HS_4_1_0_map.gif",
      "width": 108,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.28,
   "image": "this.AnimatedImageResource_0661F487_14B1_85D5_41A2_A3F160EC0A46",
   "pitch": -24.1,
   "yaw": 132.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_0627A36B_128A_D0C2_4182_BC44CBC38506",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.28,
   "yaw": 132.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0_HS_5_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156, this.camera_3B85B638_2C99_0AAD_419C_4EA9F994C2A6); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_EC113BCF_FF3B_EB1E_41E8_851AC777E9EB",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 58.67,
   "yaw": 114.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 162,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.54,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E5C3DE44_FFCB_2D02_41B3_7CB3151AD9B9",
   "pitch": 1.28,
   "yaw": 121.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_EB52C5C2_FF3B_7F06_41EE_3FCA88748D61",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": 121.23,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.28,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_ECA95279_FF39_1503_41D8_5C079C9AB314",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 48.96,
   "yaw": -155,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0_HS_2_1_0_map.gif",
      "width": 153,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD, this.camera_3B8B0643_2C99_0AE3_41BE_3D88A9EC82A4); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_ED900D42_FF39_2F06_41D0_B9FD5D0EC0DA",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 114.41,
   "yaw": -45.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0_HS_4_1_0_map.gif",
      "width": 200,
      "height": 113,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E5C2CE44_FFCB_2D02_41EA_1DD52B8E5958",
   "pitch": 0.67,
   "yaw": -43.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_EB5C629C_FF3F_1501_41C8_5E6AE6F010B2",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -43.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.67,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E8DF3692_FFC9_1D06_41CA_32C96EBD0A15",
   "pitch": 0.95,
   "yaw": 165.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E957125C_FFD7_1502_41E8_A806B05DA206",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": 165.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0_HS_6_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.95,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E73FB609_FFC9_3D02_41DF_575A1F327DC9",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 22.73,
   "yaw": 168.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0_HS_7_1_0_map.gif",
      "width": 87,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.19,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_01067F26_1785_6B3E_41AA_5B1E5AE2091B, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.11,
   "image": "this.AnimatedImageResource_0A481AC8_179C_F571_419D_35DCFE59B770",
   "pitch": -7.03,
   "yaw": 23.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_036F3FAC_179B_2B32_419D_A0D96923A8AD",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.11,
   "yaw": 23.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0_HS_8_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5, this.camera_374B33A8_2C99_09AC_41C3_9E4271E0740F); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_2218E73F_026F_E8B1_4168_BAA4A44A6711",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 82.2,
   "yaw": 52.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0_HS_0_1_0_map.gif",
      "width": 123,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 18.63,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.71,
   "image": "this.AnimatedImageResource_2478F8FD_0279_39B6_4174_0AE776432956",
   "pitch": -13.25,
   "yaw": 61.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_236C03E8_026F_6FDE_417C_31493FF7D188",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.71,
   "yaw": 61.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0_HS_1_0_6_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.25,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36, this.camera_377973B5_2C99_09A4_418B_84702BAD2543); this.mainPlayList.set('selectedIndex', 29)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_2072A3C8_0269_6FDE_415A_5DBAA81A0C08",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 110.82,
   "yaw": -112.42,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0_HS_2_1_0_map.gif",
      "width": 156,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.19,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.27,
   "image": "this.AnimatedImageResource_247878FE_0279_39B2_4178_71100BE1FB95",
   "pitch": -16.34,
   "yaw": -117.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_23EBF596_0269_2873_4175_B376E1242C2C",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.27,
   "yaw": -117.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0_HS_3_0_6_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.34,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 33)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1DB94355_12C6_7793_4192_E403CACEADEB",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 87.98,
   "yaw": 134.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0_HS_4_1_0_map.gif",
      "width": 89,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024, this.camera_36146281_2C99_0A5C_41C5_7430E4E5EEF1); this.mainPlayList.set('selectedIndex', 46)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_29D3C22A_0CA3_73C0_41A9_A0FADD7003E5",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 102.57,
   "yaw": -106.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 95,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB, this.camera_361AF28D_2C99_0A64_41C3_125EFB9F62A1); this.mainPlayList.set('selectedIndex', 41)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_29BCF9E2_0CA2_B041_419C_B0E91240900F",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 72.91,
   "yaw": -4.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0_HS_1_1_0_map.gif",
      "width": 200,
      "height": 104,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8, this.camera_39E47275_2C99_0AA4_41C1_5EE43AA1435E); this.mainPlayList.set('selectedIndex', 45)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_2979DD02_0CA2_91C0_4178_9232DCD18ACA",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0_HS_2_1_1_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -180,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0_HS_2_2_2_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0_HS_2_3_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_3CDEEF77_0D9F_7040_4191_E9E3ADBBDB98",
   "pitch": -1.51,
   "yaw": 104.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_39485CF3_0DA1_9040_4188_E7730649CAA4",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": 104.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.11,
   "image": "this.AnimatedImageResource_3CDECF77_0D9F_7040_4197_B2817776C392",
   "pitch": -7.03,
   "yaw": -79.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_39C3EB43_0DA1_9040_4192_AFB9B112B820",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.11,
   "yaw": -79.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "propagateClick": false,
 "minHeight": 0,
 "id": "htmlText_01042F26_1785_6B3E_41A3_4AD6A7494439",
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText",
 "width": "100%",
 "scrollBarMargin": 2,
 "height": "100%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\">CEO</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText20115"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104, this.camera_372AF38F_2C99_0A64_41C6_E020BAF7FAFB); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E430214F_FF49_171E_41EF_232CEEC3471B",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 52.59,
   "yaw": 0.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 155,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.54,
   "image": "this.AnimatedImageResource_189F1A19_0239_7871_417C_0E5B03C0EF02",
   "pitch": -4.59,
   "yaw": -2.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E5552A18_FF49_F502_41DD_F499097CF636",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.54,
   "yaw": -2.81,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E4192837_FF4B_150F_41EC_8B3D51CBFADD",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 83.23,
   "yaw": 66.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0_HS_2_1_0_map.gif",
      "width": 162,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.47,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.94,
   "image": "this.AnimatedImageResource_189FFA19_0239_7871_4170_3A31CA91858C",
   "pitch": -17.07,
   "yaw": 57.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E32F5B63_FF49_2B06_41CB_4EA362AD0FED",
 "data": {
  "label": "Arrow 05b Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.94,
   "yaw": 57.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0_HS_3_0_0_map.gif",
      "width": 48,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.07,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0, this.camera_375B339B_2C99_0A6C_41C3_9F8BDD92FE52); this.mainPlayList.set('selectedIndex', 30)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E03B02B6_FF49_350E_41D1_89E35A9709C1",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0_HS_4_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -180,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0_HS_4_2_2_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0_HS_4_3_3_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0_HS_4_4_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0_HS_4_5_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.2,
   "image": "this.AnimatedImageResource_18800A19_0239_7871_417B_DB698FAE9A24",
   "pitch": -34.35,
   "yaw": -101.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E03EFA70_FF4B_1502_41D4_56FE361EE955",
 "data": {
  "label": "Arrow 04a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.2,
   "yaw": -101.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0_HS_5_0_6_map.gif",
      "width": 22,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -34.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E, this.camera_364EE2CD_2C99_0BE4_41AA_C49EA26B851E); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1BB2E50A_0229_2852_4171_C1A6C865F894",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_0_2_1_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -180,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_0_3_2_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_0_4_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_0_5_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.78,
   "image": "this.AnimatedImageResource_1E9E290D_0219_F856_4177_5D5B861AD1D3",
   "pitch": -19.16,
   "yaw": 87.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_188B5662_0229_28D2_4161_94FC3A034751",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.78,
   "yaw": 87.23,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_1_0_6_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5ECBD01_FF39_267E_41D3_145261DB322E, this.camera_367E52DA_2C99_0BEC_41C4_ECCCD27D088D); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1BAF9E01_0227_184E_4161_2BB5E56F7209",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -180,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_2_2_2_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_2_3_3_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_2_4_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_2_5_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.13,
   "image": "this.AnimatedImageResource_1E9FD90D_0219_F856_416A_8C8821EE7ABD",
   "pitch": -20.16,
   "yaw": -97.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1840B10A_0227_2852_4175_1A8637B31D8F",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.13,
   "yaw": -97.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_3_0_6_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1, this.camera_376ED3C6_2C99_09E4_41B0_B6EB78131C0F); this.mainPlayList.set('selectedIndex', 33)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1B21F2EF_0CE3_B040_41A3_F167E1D66066",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 122.13,
   "yaw": -117.31,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_2520194B_0C62_F040_4171_B4EAF4F95FB6",
   "pitch": -1.75,
   "yaw": -139.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_14F3DF70_0CE3_9041_4199_5A63E0D1E046",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -139.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_0266479B_179B_1B17_41A8_E0F1A4B35CEB, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.5,
   "image": "this.AnimatedImageResource_0FF774EE_1785_3D31_41B3_ADE5A902D2A2",
   "pitch": -5.72,
   "yaw": 97.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_03C9F41B_1785_1D17_41B6_9FB7464E076A",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.5,
   "yaw": 97.35,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.72,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742, this.camera_37048368_2C99_0AAC_4181_9D5707AE0FE9); this.mainPlayList.set('selectedIndex', 44)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_3FF5134C_0C61_9040_41A1_07B7E37A2391",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 112.71,
   "yaw": -101.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 87,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.72,
   "image": "this.AnimatedImageResource_37489E52_0C61_B041_415B_77B698DD636F",
   "pitch": -4.57,
   "yaw": -112.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_39772289_0C62_B0C0_41A5_C3E1153CF1B6",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.72,
   "yaw": -112.06,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 41)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_3FBE74F4_0C63_9040_41A8_A23331120A6D",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 35.53,
   "yaw": 161.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 196,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 41)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_39E31725_0C63_91C0_4165_07F2DFECFE36",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 16.74,
   "yaw": -170.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0_HS_3_1_0_map.gif",
      "width": 142,
      "height": 198,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.74,
   "image": "this.AnimatedImageResource_374F8E53_0C61_B047_41A6_5DC3DA27FEF2",
   "pitch": -0.55,
   "yaw": 174.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_3935D994_0C62_90C1_415C_904EEDABEF84",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.74,
   "yaw": 174.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5E72603_FF39_2281_410D_D2CF25E55C50, this.camera_366CC2E7_2C99_0BA4_41C1_5601844D33AC); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E85D5D3B_FFF9_6F07_41D6_55552E85C315",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 94.1,
   "yaw": -54.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 106,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.88,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104, this.camera_369CB2F1_2C99_0BBF_415D_0893A254FF94); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E5DD4C03_FFFA_ED06_41EB_D42A7359B2C1",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 112.44,
   "yaw": 48.49,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0_HS_1_1_0_map.gif",
      "width": 200,
      "height": 165,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E46D8808_FF57_1502_41DE_85F0F54C2131",
   "pitch": -1.24,
   "yaw": 64.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E6F0AA34_FFF9_F502_41DA_23651A767CFE",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": 64.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.24,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E46DA808_FF57_1502_41DB_5DE9323643D0",
   "pitch": -2.33,
   "yaw": -79.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E7785FDB_FFF9_6B06_41ED_401668077244",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -79.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.33,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B, this.camera_3DFD047A_2C99_0EAC_41C6_41C75EBFAAAB); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_EC9DEACE_FF3B_F501_41E5_13F74E7D124A",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 89.08,
   "yaw": 59.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 130,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96, this.camera_3DC85463_2C99_0EDC_41C5_4136611B3A5D); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_EB2B548F_FF3B_7D1E_41EF_A8A66778989A",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 65.18,
   "yaw": -19.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0_HS_1_1_0_map.gif",
      "width": 200,
      "height": 110,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E5C51E45_FFCB_2D02_41E9_FF87767A8ED5",
   "pitch": -1.55,
   "yaw": -21.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E9335AE4_FF39_1502_41E4_F0D2A0E71E96",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -21.36,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.77,
   "image": "this.AnimatedImageResource_E5C5DE45_FFCB_2D02_41E6_9EEAB1D4E0A5",
   "pitch": -28.05,
   "yaw": 27.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E845A761_FF37_3B03_41D4_00577A8254A5",
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.77,
   "yaw": 27.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0_HS_3_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5E72603_FF39_2281_410D_D2CF25E55C50, this.camera_3DF4F46F_2C99_0EA4_41C6_439E07B3643A); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_EAF4AE4F_FFC9_6D1E_419B_4D44AC2FADD2",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 98.38,
   "yaw": -103.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0_HS_4_1_0_map.gif",
      "width": 200,
      "height": 158,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E5C45E45_FFCB_2D02_41E3_2656395E341F",
   "pitch": -3.12,
   "yaw": -106.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_EAE05920_FFC9_3702_41C4_108C857F0D0F",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -106.42,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5EB0441_FF39_26FE_41EC_E9764933A848, this.camera_39C6625C_2C99_0AE4_41BE_17524BADE0EE); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_10D250E0_0C9E_9040_417E_71C82D3DE870",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 111.95,
   "yaw": -74.99,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0_HS_0_1_0_map.gif",
      "width": 148,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 40)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_13E48E2E_0C9F_93C1_4143_C1E438B67980",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 110.76,
   "yaw": 125.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0_HS_1_1_0_map.gif",
      "width": 157,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.44,
   "image": "this.AnimatedImageResource_2524994E_0C62_F040_4167_1150F67C3C84",
   "pitch": -1.39,
   "yaw": 87.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_122BFD14_0C9F_71C1_4194_84A5C0F71C66",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.44,
   "yaw": 87.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.39,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.44,
   "image": "this.AnimatedImageResource_2524C94E_0C62_F040_4195_D2EC3B9460D0",
   "pitch": -1.43,
   "yaw": 16.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_124BBAEC_0CA1_9041_4158_84F12D91B6BC",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.44,
   "yaw": 16.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.43,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F581FFCB_FF39_6182_41E2_D6EB76625001, this.camera_39D61251_2C99_0AFC_41B6_B5E5AE616AE8); this.mainPlayList.set('selectedIndex', 39)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_13D84CF5_0CA1_F043_41A7_59E66B2D2697",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 56.92,
   "yaw": 22.99,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0_HS_4_1_0_map.gif",
      "width": 200,
      "height": 116,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0_HS_5_0.png",
      "width": 150,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.17,
   "yaw": -107.73
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12B55702_0CA3_B1C0_4194_1B5894DAA553",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.85,
   "yaw": -107.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.17,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F581C873_FF39_6E82_41E5_2D1192608196_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38, this.camera_37348376_2C99_0AA4_41BE_160C09B5300D); this.mainPlayList.set('selectedIndex', 35)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_158DCCAF_0CE1_B0C0_41A3_7361D38E89D0",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_0_2_1_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -180,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_0_3_2_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_0_4_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_0_5_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_2526094C_0C62_F040_4169_5EEE28C6237A",
   "pitch": -0.75,
   "yaw": 64.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_10E4420C_0CE2_B3C0_4179_BCF9D7E77E61",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": 64.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_1_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34, this.camera_373AE382_2C99_0A5C_41B4_33E90ED9C710); this.mainPlayList.set('selectedIndex', 37)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_16237C57_0CE2_9040_4198_473B4DD16FDF",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -180,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_2_2_2_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_2_3_3_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_2_4_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_2_5_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_2526C94D_0C62_F040_4196_E87115162426",
   "pitch": 3.34,
   "yaw": -116.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_16C78D09_0CE3_B1C3_41A5_1255355A22C3",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": -116.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_3_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.34,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C, this.camera_362892B2_2C99_0BBD_41AA_5BA0F1332328); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E3A97C4D_FF4F_ED02_41B4_80871D640698",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 77.51,
   "yaw": -113.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0_HS_0_1_0_map.gif",
      "width": 164,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.54,
   "image": "this.AnimatedImageResource_18825A1A_0239_7873_4172_39E3A541F0FE",
   "pitch": -3.88,
   "yaw": -98.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E33B2936_FF4F_770E_41E5_5397A093F6A6",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.54,
   "yaw": -98.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.88,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E2731514_FF77_1F02_41C1_DEA13ED93A3A",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 79.75,
   "yaw": -11.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0_HS_2_1_0_map.gif",
      "width": 136,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.12,
   "image": "this.AnimatedImageResource_1882CA1B_0239_7871_4176_490E290CCA3B",
   "pitch": 6.82,
   "yaw": 10.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E20098BD_FF79_3503_41ED_B6DC2CBF62CF",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.12,
   "yaw": 10.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8, this.camera_3658E2BF_2C99_0BA4_41BC_236FC241F729); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E198D65C_FF49_1D01_41E6_8C376C8BB6B9",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 107.08,
   "yaw": 84.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0_HS_4_1_0_map.gif",
      "width": 183,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.74,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.56,
   "image": "this.AnimatedImageResource_15ED6AFF_09F0_D52A_419D_E9CE44DF7FC5",
   "pitch": 15.57,
   "yaw": 77.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E1B06576_FF4F_1F0E_41E5_B5F700D49BA3",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.56,
   "yaw": 77.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 15.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 27.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0_HS_6_0.png",
      "width": 470,
      "height": 123,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.59,
   "yaw": 89.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_07F73D45_17BB_EF73_41B5_EAB87DA29E3B",
 "data": {
  "label": "CEO OFFICE"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 27.7,
   "yaw": 89.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0_HS_6_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 24.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0_HS_7_0.png",
      "width": 424,
      "height": 424,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.49,
   "yaw": -20.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_0639459B_1785_1F17_41AC_33AC0E1112DE",
 "data": {
  "label": "General Manager"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 24.62,
   "yaw": -20.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0_HS_7_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.49,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41, this.camera_3A7F451D_2C99_0E67_41C2_D61BD8D363F3); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E7C7CFC2_FFC9_6B06_41EC_9B42E860595D",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 88.17,
   "yaw": -136.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_0_1_0_map.gif",
      "width": 120,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E46C6809_FF57_1502_41B3_DE6747219800",
   "pitch": 1.3,
   "yaw": -161.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E6741CAF_FFCB_2D1E_41D6_2B971E778D14",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -161.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_E765417E_FFCF_17FE_41DF_8EED84DCE410, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.24,
   "image": "this.AnimatedImageResource_E46C2809_FF57_1502_41B5_BEBE2E3FE7D5",
   "pitch": 6.22,
   "yaw": 108.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E745B8A6_FFCF_1501_41C7_3B0EBF2424B8",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.24,
   "yaw": 108.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC, this.camera_3A410506_2C99_0E65_41B3_569C5545A791); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E66BE5D2_FFC9_1F01_41EF_CC4A22315273",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 39.62,
   "yaw": -67.58,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_4_1_0_map.gif",
      "width": 187,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.42,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0, this.camera_3A4BA511_2C99_0E7F_41B5_4B4D7E0F6D82); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E7355D83_FFC9_2F07_41CE_13EACB139F4C",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.58,
   "yaw": -33.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_5_1_0_map.gif",
      "width": 121,
      "height": 199,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.44,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C, this.camera_3A5D74FB_2C99_0FAC_41B2_AE02BA84B82E); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E6974A6A_FFC9_7506_41DD_D0378E25AE7A",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 16.84,
   "yaw": -11.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_6_1_0_map.gif",
      "width": 97,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.07,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E465080E_FF57_151E_41E9_A9CF9511080D",
   "pitch": 0.11,
   "yaw": -62.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E709C0A9_FFCB_1502_41DD_BF0CFE10DD33",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -62.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_7_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.11,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E465280E_FF57_151E_41E5_DC525ED0598D",
   "pitch": 0.3,
   "yaw": -26.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E63FE5E1_FFCB_1F02_41E6_84803E41141A",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -26.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_8_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E465C80E_FF57_151E_41D6_55F0941AE15E",
   "pitch": 0.04,
   "yaw": -14.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E68B5220_FFCA_F502_41E5_3D6F4923C07F",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -14.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_9_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9, this.camera_3A630529_2C99_0EAF_41B5_7EF986D7E5AC); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E6CC868A_FF49_7D06_41DC_D531E419854C",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 36.7,
   "yaw": 21.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_10_1_0_map.gif",
      "width": 188,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.34,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E465880F_FF57_151E_41DE_E248530E5EF7",
   "pitch": 1.3,
   "yaw": 25.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E728A4F0_FF4B_1D01_41E0_E64A76579FEA",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": 25.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_11_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F58225F7_FF3B_E182_41EE_5523C7237D95, this.camera_387466ED_2C99_0BA4_4190_297C8469CB54); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1C7EF1AB_09D7_D72A_4181_81E16EDA0046",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 56.16,
   "yaw": -56.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0_HS_0_1_0_map.gif",
      "width": 189,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71, this.camera_387B8708_2C99_0A6C_41C3_7FED0B84E1AE); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1EAA6443_09D0_5D5B_4192_140C9A7CD289",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0_HS_1_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0_HS_1_2_1_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0_HS_1_3_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0_HS_1_4_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_15905B20_09D0_D4D6_4197_96727857527C",
   "pitch": -3.11,
   "yaw": 11.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FA0CC4A_09D0_CD6A_4165_407B015F169D",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": 11.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0_HS_2_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.11,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_159FBB21_09D0_D4D6_4190_23A648548CD4",
   "pitch": -2.7,
   "yaw": -55.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1EC0B63B_09D0_5D2B_4176_734613D38E29",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -55.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0_HS_3_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5EB0441_FF39_26FE_41EC_E9764933A848, this.camera_39A02245_2C99_0AE4_41BF_BE385182E344); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_14EC7E06_0CE1_73C1_4181_CB5199DA1723",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0_HS_0_2_1_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0_HS_0_3_3_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0_HS_0_4_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0_HS_0_5_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4, this.camera_39B04239_2C99_0AAF_41C0_A9DC6067D54B); this.mainPlayList.set('selectedIndex', 36)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_16824197_0CE6_90C0_41A5_DFF3E8CE9D1A",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 120.96,
   "yaw": 122.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0_HS_1_1_6_map.gif",
      "width": 200,
      "height": 137,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_2521694C_0C62_F040_417F_9E1C97B1084D",
   "pitch": 1.44,
   "yaw": 103.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_159B2F58_0CE7_9040_4198_076C0D18302F",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": 103.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0_HS_2_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.44,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0_HS_3_0.png",
      "width": 88,
      "height": 88,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.98,
   "yaw": -29.44
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_15BB71DD_0CE1_9043_41A1_901BC011A198",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.23,
   "yaw": -29.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0_HS_3_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.98,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C, this.camera_36A27315_2C99_0A67_41A1_3C6E34A28273); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_109E218B_022B_E852_4180_5FA72D9736DD",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 113.74,
   "yaw": -24.24,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 182,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.15,
   "image": "this.AnimatedImageResource_240F78F2_0279_39B2_4177_5CDE1AE45108",
   "pitch": -20.48,
   "yaw": -26.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_17AE5928_0228_F85F_4178_02919FF21DBD",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.15,
   "yaw": -26.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0_HS_1_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.48,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A, this.camera_36D04326_2C99_0AA5_41C6_2263320F9322); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1518F8C5_023F_39D6_4164_A296A47029F4",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 107.52,
   "yaw": 129.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0_HS_2_1_0_map.gif",
      "width": 152,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.48,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.17,
   "image": "this.AnimatedImageResource_2470C8F3_0279_39B2_4162_82262143A690",
   "pitch": -16.09,
   "yaw": 158.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1A433FE6_0238_F7D2_4164_1665B8234FC2",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.17,
   "yaw": 158.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0_HS_3_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.09,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5FE026B_FF39_2282_41B5_0F2204858344_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B, this.camera_36B2E307_2C99_0A63_418C_6740E38D22BA); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_0E8EA230_01E9_284F_4150_39DCEAA4D128",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 73.04,
   "yaw": 89.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0_HS_0_1_0_map.gif",
      "width": 163,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.07,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC, this.camera_368292FD_2C99_0BA7_41C4_E070CD40CE99); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_11F050AD_01EB_E856_4136_967B5F615FC6",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 65.98,
   "yaw": -92.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0_HS_1_1_0_map.gif",
      "width": 195,
      "height": 199,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.88,
   "image": "this.AnimatedImageResource_240D78F1_0279_39CE_417D_170A7ECBB166",
   "pitch": -18.28,
   "yaw": -88.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_0E11B049_01E9_28DE_4143_5BA5F2A23AFD",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.88,
   "yaw": -88.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0_HS_2_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.28,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.72,
   "image": "this.AnimatedImageResource_240D38F1_0279_39CE_413E_C1B9491E1C76",
   "pitch": -16.88,
   "yaw": 94.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_0E1A75EA_01E9_6BD2_4173_00E3BE872532",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.72,
   "yaw": 94.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0_HS_3_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.88,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "propagateClick": false,
 "minHeight": 0,
 "id": "htmlText_E76B017E_FFCF_17FE_41E6_1B349F51464F",
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText",
 "width": "100%",
 "scrollBarMargin": 2,
 "height": "100%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.39vh;\">Hello! Welcome to Kabba Holding company.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText29047"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2, this.camera_3BCD8672_2C99_0ABC_41A5_3F7DAF5A3DDC); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_23F1F86F_026B_38D1_4174_EDF0BCAF864E",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 79.78,
   "yaw": 36.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0_HS_0_1_0_map.gif",
      "width": 174,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.17,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.01,
   "image": "this.AnimatedImageResource_2479A8FE_0279_39B2_416D_C98A95BCB798",
   "pitch": -14.55,
   "yaw": 34.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_26D08991_026B_184E_4168_AE78D2C15297",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.01,
   "yaw": 34.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0_HS_1_0_6_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B, this.camera_3BF3067F_2C99_0AA4_41BB_9D9E5037A32E); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_24B2A298_0269_287E_416F_34EF08B3E8CC",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 92.03,
   "yaw": -70.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 172,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.41,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.86,
   "image": "this.AnimatedImageResource_247938FF_0279_39B2_416E_6058D024FC66",
   "pitch": -17.49,
   "yaw": -74.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_27BD9C0A_0269_3853_4161_0469CABDF2FF",
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.86,
   "yaw": -74.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0_HS_3_0_6_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.49,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38, this.camera_3BDCA666_2C99_0AA4_41B4_A63BBB09D5FB); this.mainPlayList.set('selectedIndex', 32)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_180859EB_0CA2_9040_41A7_92AD4B861D34",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 81.42,
   "yaw": 138.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0_HS_4_1_0_map.gif",
      "width": 129,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5.86,
   "image": "this.AnimatedImageResource_255CE949_0C62_F040_415C_F65D46D3F258",
   "pitch": 7.99,
   "yaw": 166.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_19D11526_0CE1_B1C0_4196_AD0BDEFA4380",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.86,
   "yaw": 166.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.99,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104, this.camera_3A1734AA_2C99_0FAC_41BD_CB776BE1A6CE); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E0DE279C_FF59_1B02_41E0_2B0917708254",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 64.35,
   "yaw": -19.35,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 190,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.38,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.82,
   "image": "this.AnimatedImageResource_1884BA1D_0239_7871_4162_EB1B8842753A",
   "pitch": -4.07,
   "yaw": -12.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_DE87B9DA_FF5B_7706_41DF_6C794F219CB5",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.82,
   "yaw": -12.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.07,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C, this.camera_39F4E269_2C99_0AAC_41C2_9E80269ADDD6); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E0BEDBEC_FF5F_EB01_41E0_89A818E0A9A9",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 77.97,
   "yaw": 92.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 155,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.13,
   "image": "this.AnimatedImageResource_18857A1C_0239_7877_416E_23CA2C8E9EB8",
   "pitch": -4.35,
   "yaw": 79.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_DFC19158_FF5E_F702_41E6_B47D1983D700",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.13,
   "yaw": 79.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F581CE96_FF39_6382_41E7_E2755B74444F_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8, this.camera_3BAF865B_2C99_0AEC_41C3_B2027B0AEB1A); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_DF536162_FF4B_1706_41E9_5DBE19D74F6A",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 116.51,
   "yaw": -42.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0_HS_0_1_0_map.gif",
      "width": 176,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.73,
   "image": "this.AnimatedImageResource_18858A1C_0239_7877_416B_5ACB07144C48",
   "pitch": 12.4,
   "yaw": -35.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_DF1D189E_FF4B_153E_41DB_587FC7604461",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.73,
   "yaw": -35.06,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 12.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F58225F7_FF3B_E182_41EE_5523C7237D95, this.camera_3BB8364F_2C99_0AE3_41BC_3C15BB31A267); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_DDDB6F5A_FF49_6B06_41D6_82CB9248FDBE",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 94.35,
   "yaw": 92.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 138,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.72,
   "image": "this.AnimatedImageResource_181BEB0C_0C66_B1C0_41A7_EDE3619436F4",
   "pitch": -4.32,
   "yaw": 108.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12EE7DAC_09F0_4F2D_4187_FDD9174E7BFD",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.72,
   "yaw": 108.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC, this.camera_3A83A556_2C99_0EE5_41C6_5E88B876334B); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_128B0FEB_09F0_4B2B_419B_702ECCC5CA1B",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 61.2,
   "yaw": 40.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0_HS_0_1_0_map.gif",
      "width": 194,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 13.82,
   "image": "this.AnimatedImageResource_29717C5B_09F7_CD6A_4197_77A9D346799E",
   "pitch": -23.55,
   "yaw": 40.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_13863286_09F3_F5DD_41A2_E52FC2D68533",
 "data": {
  "label": "Arrow 05b Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 13.82,
   "yaw": 40.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0_HS_1_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.56,
   "image": "this.AnimatedImageResource_29719C5C_09F7_CD6E_4154_08CE73AB87FA",
   "pitch": -22.3,
   "yaw": -71.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_124C3BD9_09F0_4B76_41A0_DC8749ACDC4B",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.56,
   "yaw": -71.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0_HS_2_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE026B_FF39_2282_41B5_0F2204858344, this.camera_3AB74562_2C99_0EDD_41BE_DF44F34105E2); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_156B1852_09F0_D57A_4151_9E5885E440A2",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 31.47,
   "yaw": -67.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0_HS_3_1_0_map.gif",
      "width": 151,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB, this.camera_3ABB656E_2C99_0EA4_41B4_CF8DB3C2F8EC); this.mainPlayList.set('selectedIndex', 41)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_24F4041B_0CBE_97C7_419E_6AF7CFDD4BF3",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 91.93,
   "yaw": -130.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0_HS_4_1_0_map.gif",
      "width": 200,
      "height": 152,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_25511941_0C62_F040_41A5_703B24395552",
   "pitch": 1.13,
   "yaw": -117.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2EC5FC1F_0CA1_97FF_41A3_4FA78BD81C25",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": -117.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.13,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742, this.camera_3B2C75F5_2C99_09A4_41B4_C377FA23CFF0); this.mainPlayList.set('selectedIndex', 44)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_2A8BCD82_0CA6_B0C0_4190_B5099F725DF9",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 117.5,
   "yaw": 120.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 134,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.52,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.73,
   "image": "this.AnimatedImageResource_25325955_0C62_F040_4172_39E047378E8B",
   "pitch": -2.31,
   "yaw": 131.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2B7FECF3_0CA6_B047_416C_5B030D326B2B",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.73,
   "yaw": 131.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_008E0B83_1785_6BF7_41AB_6E6C4D1A3160, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.3,
   "image": "this.AnimatedImageResource_0D5172E0_1787_1531_4186_C91AAFD29836",
   "pitch": -33.35,
   "yaw": -33.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_01746767_1785_3B3E_41B6_68C73E902CB8",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.3,
   "yaw": -33.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104, this.camera_3967C1E8_2C99_09AD_41BF_5FEAA6218048); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E4BD7A25_FF59_7502_41EA_7AD440D14BC8",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 73.53,
   "yaw": -14.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0_HS_0_1_0_map.gif",
      "width": 191,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.68,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F581CE96_FF39_6382_41E7_E2755B74444F, this.camera_397351D2_2C99_09FC_4194_BB3146074F23); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E4567C35_FF59_2D02_41A8_C1C0499BDD42",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 69.98,
   "yaw": 73.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0_HS_1_1_0_map.gif",
      "width": 108,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E41FE2CD_FF59_1502_41E4_58915321C18A",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 28.23,
   "yaw": 151.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0_HS_2_1_0_map.gif",
      "width": 60,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.33,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.69,
   "image": "this.AnimatedImageResource_18814A1A_0239_7873_4156_24EBF7108883",
   "pitch": 8.09,
   "yaw": 92.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E4148E91_FF5B_2D03_41E0_DA62496D5BDD",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.69,
   "yaw": 92.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.09,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.53,
   "image": "this.AnimatedImageResource_E464C80F_FF57_151E_41ED_1C8BC1A08470",
   "pitch": 6.77,
   "yaw": 158.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E4415295_FF5B_7502_41DC_29DB4ABA25D3",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.53,
   "yaw": 158.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E464E810_FF57_1502_41D0_25615415A6F8",
   "pitch": -3.57,
   "yaw": -0.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E44B5EC3_FF5B_2D06_41ED_0AF41A95AF15",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -0.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8, this.camera_394901BB_2C99_09A3_41C1_9B08A4FF7A50); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_115AD6B3_09D1_BD3B_415C_24D291A468DF",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 69.96,
   "yaw": -146.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0_HS_6_1_0_map.gif",
      "width": 117,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_12997C52_09D3_CD7A_4179_1D2590FD0DFD",
   "pitch": 2.82,
   "yaw": -173.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_10CFB141_09D0_B756_4194_C18B419FE5FA",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": -173.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0_HS_7_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4, this.camera_379923D2_2C99_09FC_41AD_193D6C211D08); this.mainPlayList.set('selectedIndex', 36)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_154AA596_0CE2_90C0_417B_DC1BBD16260F",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -180,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0_HS_0_2_2_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0_HS_0_3_3_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0_HS_0_4_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0_HS_0_5_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_2527894D_0C62_F040_4199_BC1F5868A431",
   "pitch": 0.84,
   "yaw": -93.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_102DAA6E_0CE2_9040_419F_5089CEE95A76",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -93.93,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0_HS_1_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0, this.camera_360AB299_2C99_0A6C_41C5_DFA49AB3E96C); this.mainPlayList.set('selectedIndex', 30)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_034054B1_129D_F05E_41A2_3EE7A2634B38",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 114.63,
   "yaw": 127.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0_HS_0_1_0_map.gif",
      "width": 156,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.72,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0, this.camera_3638D2A6_2C99_0BA4_41B9_8C989E17B9B9); this.mainPlayList.set('selectedIndex', 30)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_0144B691_129A_505E_4194_52CEB6F31EA7",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 77.64,
   "yaw": -140.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0_HS_1_1_0_map.gif",
      "width": 172,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_06562493_14B1_85CE_418F_5B7C777AA272",
   "pitch": -3.77,
   "yaw": 175.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_06020263_129A_B0C2_417A_791A103E2B9C",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": 175.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "propagateClick": false,
 "minHeight": 0,
 "id": "htmlText_02CCF14E_179D_170E_41AB_153BB5437FFA",
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText",
 "width": "100%",
 "scrollBarMargin": 2,
 "height": "100%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\">Welcome to PPS! </SPAN></SPAN></DIV><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\">Pesco Pest Solution</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText11810"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A, this.camera_3A0674C1_2C99_0FDE_41B7_5F36A212E2FF); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1A456073_0227_E8B2_4153_CBF266E55DBB",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 106.1,
   "yaw": 26.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0_HS_0_1_0_map.gif",
      "width": 194,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.11,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B, this.camera_3A1F04B4_2C99_0FA5_41C5_E75E14C1D37D); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1BDACC2B_0229_7852_4173_C793D7888FB2",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 103.39,
   "yaw": -121.34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 156,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.97,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.49,
   "image": "this.AnimatedImageResource_2472D8F4_0279_39B6_417A_8A53CB75B823",
   "pitch": -15.96,
   "yaw": -6.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1BBBF46A_0229_28D2_4169_63526AB437EC",
 "data": {
  "label": "Arrow 05a Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.49,
   "yaw": -6.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0_HS_4_0_0_map.gif",
      "width": 24,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.96,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.47,
   "image": "this.AnimatedImageResource_247298F4_0279_39B6_417E_69D9FE01B00C",
   "pitch": -15.98,
   "yaw": -124.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1C4D1399_022B_687E_417A_2BF05E0E47C5",
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 11.47,
   "yaw": -124.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0_HS_5_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.98,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5ECBD01_FF39_267E_41D3_145261DB322E, this.camera_3B71D618_2C99_0A6D_41BA_C921F21D34EC); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1EE806F9_0219_E9BE_4141_529AE28F8C8A",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 67.11,
   "yaw": 106.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0_HS_0_1_0_map.gif",
      "width": 135,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.46,
   "image": "this.AnimatedImageResource_247588FB_0279_39B2_416B_CE6F6B1181B3",
   "pitch": -14.28,
   "yaw": 121.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_23B2DA32_0269_78B2_416F_563237330E2C",
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.46,
   "yaw": 121.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0_HS_1_0_6_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.28,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5, this.camera_3B5DB600_2C99_0A5C_41B4_7D3879006728); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1C2F3C32_0269_78B2_4138_39CCF2A71514",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 75.65,
   "yaw": 24.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0_HS_2_1_0_map.gif",
      "width": 154,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.5,
   "image": "this.AnimatedImageResource_247518FC_0279_39B6_4149_8E3034F86130",
   "pitch": -19.78,
   "yaw": 2.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D53939F_026B_2871_4125_2C3AA9984224",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.5,
   "yaw": 2.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0_HS_3_0_6_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38, this.camera_3B40C60B_2C99_0A63_4192_40B71CF9F7E4); this.mainPlayList.set('selectedIndex', 35)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_17ABF096_0CE1_70C0_41A7_2BC2CE8F2505",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 86.59,
   "yaw": -61.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0_HS_4_1_0_map.gif",
      "width": 160,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_25582945_0C62_F040_41A5_301B20C72830",
   "pitch": 2.04,
   "yaw": -22.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_17D52562_0CE7_F041_41A0_FFFBAFB05535",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": -22.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F581C873_FF39_6E82_41E5_2D1192608196, this.camera_3B66C623_2C99_0AA3_416D_676A51A34297); this.mainPlayList.set('selectedIndex', 38)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1713285D_0CE3_9043_4181_F723C49B4AD1",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 27.68,
   "yaw": 165.43,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0_HS_6_1_0_map.gif",
      "width": 100,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F581C873_FF39_6E82_41E5_2D1192608196, this.camera_3B94E62E_2C99_0AA5_41A2_7EA4164F8E1C); this.mainPlayList.set('selectedIndex', 38)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_17BEFE9E_0CE2_90C1_4193_55B1F0561FFB",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 39.51,
   "yaw": -160.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0_HS_7_1_0_map.gif",
      "width": 137,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.64,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.73,
   "image": "this.AnimatedImageResource_25592946_0C62_F040_4173_B6CD6723BFD3",
   "pitch": 4.05,
   "yaw": -153.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_10ED50E1_0CE2_F040_41A1_416A6E8E9F70",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.73,
   "yaw": -153.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0_HS_8_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82, this.camera_3DE10491_2C99_0E7C_41C4_2AD3D7ED214E); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_03A455CA_129E_D3C2_418B_1F44560DF21B",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0_HS_0_2_1_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -180,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0_HS_0_3_2_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0_HS_0_4_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0_HS_0_5_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.13,
   "image": "this.AnimatedImageResource_0E14ADA9_14CE_87DA_41B1_18202FDAAA98",
   "pitch": -5.02,
   "yaw": 124.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_059BFDE4_14D2_8749_41AD_D011DDBFC904",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.13,
   "yaw": 124.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0_HS_1_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.02,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9, this.camera_3DEED49E_2C99_0E64_41B0_62FFF56402DE); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_05F2A37D_14D1_8335_41AD_2BB31DF3CA49",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 83.46,
   "yaw": -139.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0_HS_2_1_6_map.gif",
      "width": 200,
      "height": 170,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.87,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.39,
   "image": "this.AnimatedImageResource_0E175DAA_14CE_87DE_41B3_52E541198634",
   "pitch": -3.01,
   "yaw": -132.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_071D9F33_14CE_84CE_41AE_0B2F52662884",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.39,
   "yaw": -132.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0_HS_3_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "propagateClick": false,
 "minHeight": 0,
 "id": "htmlText_0295E44A_1785_3D71_4153_76B49FBB3BBF",
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText",
 "width": "100%",
 "scrollBarMargin": 2,
 "height": "100%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\">Jon link Man Power Solution</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText7373"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_2CF2191E_0CA2_91C0_41A5_A6ADBA298389",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 80.55,
   "yaw": 16.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 109,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.65,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0_HS_1_0.png",
      "width": 100,
      "height": 100,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.88,
   "yaw": -11.74
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2D93A152_0CA3_F040_41A8_EFE27C53870B",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.92,
   "yaw": -11.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.88,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 39)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_2C1526E5_0CA3_7040_41A7_19759B966580",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 70.01,
   "yaw": 103.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 122,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.87,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.73,
   "image": "this.AnimatedImageResource_252BD950_0C62_F040_41A7_6E3403AD9466",
   "pitch": 1.71,
   "yaw": 79.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2C92FCC2_0CA2_B040_418A_E3E9D10135B8",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.73,
   "yaw": 79.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_0295844A_1785_3D71_41AF_B35BF57028E3, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.43,
   "image": "this.AnimatedImageResource_0FFF04F9_1785_3D13_419B_42F6B3E3BD4C",
   "pitch": -1.02,
   "yaw": -80.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_03DA20E1_1785_F532_4192_923BEEE6DE7F",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.43,
   "yaw": -80.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.02,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104, this.camera_3AF1259C_2C99_0E65_4173_C9591D19CD0E); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E18EFF23_FF57_2B06_41DF_8E22A2E227D2",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 120.58,
   "yaw": 118.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 154,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.65,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_18848A1C_0239_7877_4135_FB5233D400D0",
   "pitch": 2.26,
   "yaw": 111.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E0AB8398_FF57_1B02_41CD_0571F0A3A65A",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": 111.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E46EF806_FF57_150E_41EB_DD411C21D778",
   "pitch": -2.47,
   "yaw": -18.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E95977A3_FFCB_1B06_41E2_1970B2B6AD06",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -18.2,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.47,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.51,
   "image": "this.AnimatedImageResource_E46EA806_FF57_150E_4177_A47011FCEBA4",
   "pitch": -29.2,
   "yaw": -28.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E9E6092C_FFC9_7702_41B1_5B25AFB25E4C",
 "data": {
  "label": "Arrow 04a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.51,
   "yaw": -28.34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_1_0_0_map.gif",
      "width": 22,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD, this.camera_36F6E341_2C99_0ADF_41C4_DE4E19D08B63); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E8F6D31F_FFC9_1B3E_41ED_90771D56D3CF",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 114.66,
   "yaw": -17.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 130,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.24,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E94680C5_FFCF_3502_41E2_8E561DACB48D",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 52.72,
   "yaw": -92.2,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_3_1_0_map.gif",
      "width": 200,
      "height": 176,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E46D6807_FF57_150E_41D3_6EA9C85B7B88",
   "pitch": 1.03,
   "yaw": -106.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E9163482_FFCF_3D06_41C0_A0F70CB8ABD3",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -106.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41, this.camera_36E6934D_2C99_0AE7_41B0_5B56FF910702); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E9FC3BDC_FFCF_2B02_41D5_6CC7D919E89A",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_5_1_1_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -180,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_5_2_2_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_5_3_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_5_4_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41, this.camera_3714F35C_2C99_0AE5_41C0_03372FCE235C); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_E7B4027B_FFFF_1506_41CD_594383504EBE",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 59.61,
   "yaw": -150.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_6_1_6_map.gif",
      "width": 73,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_E46D3808_FF57_1502_41D6_BC7EE7FA4AC7",
   "pitch": -1.47,
   "yaw": 150.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E717144D_FFF9_1D02_41EC_60776BEFCE16",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": 150.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_7_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.47,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "propagateClick": false,
 "minHeight": 0,
 "id": "htmlText_1D1578C0_129A_B03E_4196_C965F1BBC656",
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText",
 "width": "100%",
 "scrollBarMargin": 2,
 "height": "100%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\">This is the Finance room</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText3875"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB, this.camera_3AC18590_2C99_0E7D_41C3_DF1B7C61A524); this.mainPlayList.set('selectedIndex', 41)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_29D9F18A_0CAF_90C1_41A3_7924D0FB8A43",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0_HS_0_2_3_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0_HS_0_3_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0_HS_0_4_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F56890_FF39_6F9E_41BB_ED300D126577, this.camera_3AAC857A_2C99_0EAC_419F_D398BA811FDA); this.mainPlayList.set('selectedIndex', 43)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_2826236A_0CAE_B041_4180_66CA34CC4EE6",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 102.41,
   "yaw": 129.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0_HS_1_1_6_map.gif",
      "width": 186,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.49,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F56890_FF39_6F9E_41BB_ED300D126577, this.camera_3AD28584_2C99_0E65_41C4_D4D00BD473D8); this.mainPlayList.set('selectedIndex', 43)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_2A6C48D2_0CA1_7040_41A3_5648E161FB04",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 76.61,
   "yaw": -142.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0_HS_2_1_6_map.gif",
      "width": 146,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.19,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.71,
   "image": "this.AnimatedImageResource_252F5953_0C62_F040_418A_48104B04AD3E",
   "pitch": -6.07,
   "yaw": -175.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_28699E27_0CA1_B3C0_419A_2939153B51CD",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.71,
   "yaw": -175.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0_HS_3_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.07,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.74,
   "image": "this.AnimatedImageResource_252F8953_0C62_F040_4165_651F7DF4CADC",
   "pitch": -1.05,
   "yaw": -6.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_29C9A930_0CA2_91C0_41A6_CC21BAB063F4",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.74,
   "yaw": -6.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0_HS_4_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "transparencyActive": true,
 "horizontalAlign": "center",
 "propagateClick": true,
 "minHeight": 1,
 "maxWidth": 58,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "paddingLeft": 0,
 "width": 58,
 "minWidth": 1,
 "borderSize": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "mode": "push",
 "height": 58,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "borderRadius": 0,
 "paddingRight": 0,
 "paddingBottom": 0,
 "visible": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton VR"
 }
},
{
 "transparencyActive": true,
 "horizontalAlign": "center",
 "propagateClick": true,
 "minHeight": 1,
 "maxWidth": 49,
 "id": "IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270",
 "paddingLeft": 0,
 "width": 100,
 "right": 30,
 "minWidth": 1,
 "borderSize": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "bottom": 8,
 "mode": "push",
 "height": 75,
 "shadow": false,
 "iconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270.png",
 "rollOverIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "maxHeight": 37,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_pressed.png",
 "paddingRight": 0,
 "paddingBottom": 0,
 "visible": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton VR"
 }
},
{
 "transparencyActive": true,
 "horizontalAlign": "center",
 "propagateClick": true,
 "minHeight": 1,
 "maxWidth": 58,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "paddingLeft": 0,
 "width": 58,
 "minWidth": 1,
 "borderSize": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "mode": "toggle",
 "height": 58,
 "shadow": false,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton HS "
 }
},
{
 "transparencyActive": true,
 "horizontalAlign": "center",
 "propagateClick": true,
 "minHeight": 1,
 "maxWidth": 58,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "paddingLeft": 0,
 "width": 58,
 "minWidth": 1,
 "borderSize": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "mode": "toggle",
 "height": 58,
 "shadow": false,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton GYRO"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F581C873_FF39_6E82_41E5_2D1192608196, this.camera_3806A6A1_2C99_0A5C_41C3_E7C5EA46019A); this.mainPlayList.set('selectedIndex', 38)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_11235A0D_0CA2_93C0_41A3_DE1690A97B52",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -180,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0_HS_0_2_2_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0_HS_0_3_3_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0_HS_0_4_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0_HS_0_5_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_13EA657D_0CA1_9040_41A0_F9AA034AB803",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 76.99,
   "yaw": 28.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0_HS_1_1_6_map.gif",
      "width": 200,
      "height": 167,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_252A994F_0C62_F040_4161_4E698CDBDB55",
   "pitch": -2.01,
   "yaw": -45.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_135BA117_0CA6_91C0_4197_35BABF94B2F0",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.14,
   "yaw": -45.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0_HS_2_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0_HS_3_0.png",
      "width": 80,
      "height": 80,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.71,
   "yaw": -4.54
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_133D1AF4_0CA7_9040_4188_AF27A7B9BAE3",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.74,
   "yaw": -4.54,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0_HS_3_0_6_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4, this.camera_36C01335_2C99_0AA7_41BD_6AFA9C022378); this.mainPlayList.set('selectedIndex', 42)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_2F724C7A_0CA1_9040_4191_44420D0395EA",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 89.83,
   "yaw": 135.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 188,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.36,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.73,
   "image": "this.AnimatedImageResource_252C4954_0C62_F040_417B_667E955DD8AC",
   "pitch": 3.72,
   "yaw": 155.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2B87D74C_0CAE_F040_4199_DA03B6C1FCB7",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.73,
   "yaw": 155.24,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.72,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_00F793DD_1787_1B12_4151_6C4A3C478564, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.03,
   "image": "this.AnimatedImageResource_0D5262DE_1787_1511_41AE_D88E99DF3212",
   "pitch": -27.65,
   "yaw": -1.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_01766914_1785_1711_41B2_8943F6595C13",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.03,
   "yaw": -1.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.65,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C, this.camera_3968F207_2C99_0A64_41A1_15F45A2D16D1); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_2D69E456_0CA2_9041_419F_DEF03A4DD1C1",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 70.57,
   "yaw": -30.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 185,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0_HS_1_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.37,
   "yaw": -37.11
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2E34CDDB_0CA1_9047_418B_BD8913E26014",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.94,
   "yaw": -37.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.37,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4, this.camera_3982022D_2C99_0AA7_41C3_54FC167C338F); this.mainPlayList.set('selectedIndex', 42)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_2E5763E3_0CA2_9047_41A0_11C8B0D67A03",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 121.92,
   "yaw": 74.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 103,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5,
   "image": "this.AnimatedImageResource_25293951_0C62_F040_4185_3FD55B13888B",
   "pitch": 0.83,
   "yaw": 68.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2D3B1157_0CA2_9040_419D_ABD01079701A",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5,
   "yaw": 68.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742, this.camera_399F721E_2C99_0A64_4197_FEB226B966A5); this.mainPlayList.set('selectedIndex', 44)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_2FADBC9B_0CA3_90C0_4189_098D9402B8FD",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 88.02,
   "yaw": -136.54,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0_HS_4_1_0_map.gif",
      "width": 200,
      "height": 140,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.6,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5,
   "image": "this.AnimatedImageResource_2529F951_0C62_F040_4147_82BFA4F6C761",
   "pitch": -1.43,
   "yaw": -160.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2F089316_0CA3_91C0_41A4_98C72F1CAE84",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5,
   "yaw": -160.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.43,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38, this.camera_3A996542_2C99_0EDD_41C4_935479313EB4); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1FFB39B4_09D1_B73D_4182_61025A0EBF6F",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 54.36,
   "yaw": 151.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0_HS_0_1_0_map.gif",
      "width": 191,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.47,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_15935B1E_09D0_D4EA_4179_204A892872CA",
   "pitch": -2.92,
   "yaw": 162.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1F0DD58E_09D0_DFED_41A3_14227C2B22D4",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": 162.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F58225F7_FF3B_E182_41EE_5523C7237D95, this.camera_3A957536_2C99_0EA5_41B3_3F2675758CD8); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1F3F236B_09D0_5B2B_4160_DA24EC4D1772",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 86.17,
   "yaw": -127.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 138,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.62,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.55,
   "image": "this.AnimatedImageResource_1592AB1E_09D0_D4EA_419D_72AEF8A0BED3",
   "pitch": -0.86,
   "yaw": -119.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1F681347_09D0_5B5A_417C_4C1A2D28E176",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -119.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.86,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5FE026B_FF39_2282_41B5_0F2204858344, this.camera_382476B7_2C99_0BA4_41C3_2F26B168D9F9); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_15CD63E4_023B_2FD6_4160_891233A13A04",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0_HS_0_2_1_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0_HS_0_3_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0_HS_0_4_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.44,
   "image": "this.AnimatedImageResource_247028F3_0279_39B2_4150_FD56337BB27E",
   "pitch": -16.89,
   "yaw": 60.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1A786F4C_0239_18D6_4166_24CDF666802B",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.44,
   "yaw": 60.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0_HS_1_0_6_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.89,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E, this.camera_3834B6AC_2C99_0BA4_41A0_7C67FF749F63); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1B4DFF92_0239_1873_4166_540C39CB3EC7",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 95.1,
   "yaw": -124.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0_HS_2_1_6_map.gif",
      "width": 169,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.98,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.05,
   "image": "this.AnimatedImageResource_247188F3_0279_39B2_4176_CCA38C71AEB4",
   "pitch": -15.01,
   "yaw": -120.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1B7FAEEF_0239_79D1_4161_9B166A581908",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.05,
   "yaw": -120.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0_HS_3_0_6_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "propagateClick": false,
 "minHeight": 0,
 "id": "htmlText_00883B83_1785_6BF7_41A9_ACE3312FB6FB",
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText",
 "width": "100%",
 "scrollBarMargin": 2,
 "height": "100%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\">Welcome to Ruby Travel Solutions</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText17487"
 }
},
{
 "propagateClick": false,
 "minHeight": 0,
 "id": "htmlText_0268679B_179B_1B17_41A5_3CF3FF4BE50A",
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText",
 "width": "100%",
 "scrollBarMargin": 2,
 "height": "100%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\">Welcome to Hedar Sanitation Services </SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText9803"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5EB0784_FF39_2187_41EF_7C13A026372D, this.camera_38165697_2C99_0A64_41A7_4EABBEAC37F1); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_1311F24C_0229_28D6_417B_1174D06C74E6",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0_HS_0_2_1_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0_HS_0_3_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0_HS_0_4_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11,
   "image": "this.AnimatedImageResource_240E88F1_0279_39CE_417F_4C2C6E9F7402",
   "pitch": -16.09,
   "yaw": 37.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_137112A6_022F_2853_40EB_C82CE272D480",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 11,
   "yaw": 37.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0_HS_1_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.09,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C, this.camera_3BE0B689_2C99_0A6C_41C3_11466B03A1A9); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_107FD52C_0229_2856_417F_9447627EDA96",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -180,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0_HS_2_2_2_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": -90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0_HS_2_3_3_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0_HS_2_4_4_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "class": "HotspotPanoramaOverlayMap"
  },
  {
   "hfov": 90,
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0_HS_2_5_5_map.gif",
      "width": 200,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.28,
   "image": "this.AnimatedImageResource_2DDA273C_09F0_BB2D_41A3_34D388A64077",
   "pitch": -34.1,
   "yaw": -139.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1404A2DF_09F1_B56A_4154_D12FA6EA3EA9",
 "data": {
  "label": "Circle Point 02c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.28,
   "yaw": -139.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0_HS_4_0_6_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -34.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_tcap0.png",
    "width": 500,
    "height": 500,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false,
 "hfov": 30,
 "id": "panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_tcap0",
 "distance": 50,
 "class": "TripodCapPanoramaOverlay"
},
{
 "layout": "horizontal",
 "propagateClick": true,
 "minHeight": 1,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "right": "0%",
 "width": 110,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "class": "Container",
 "verticalAlign": "middle",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 110,
 "shadow": false,
 "gap": 10,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "horizontalAlign": "center",
 "data": {
  "name": "button menu sup"
 }
},
{
 "layout": "vertical",
 "propagateClick": true,
 "minHeight": 1,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "class": "Container",
 "verticalAlign": "top",
 "width": "91.304%",
 "bottom": "0%",
 "contentOpaque": false,
 "height": "85.959%",
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 3,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "horizontalAlign": "center",
 "data": {
  "name": "-button set"
 }
},
{
 "layout": "horizontal",
 "propagateClick": true,
 "minHeight": 1,
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "paddingLeft": 30,
 "width": 1199,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "verticalAlign": "middle",
 "height": 51,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 3,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "horizontalAlign": "left",
 "data": {
  "name": "-button set container"
 }
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0_HS_1_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2474D8F5_0279_39B6_417A_51D8183B3E44",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5ECBD01_FF39_267E_41D3_145261DB322E_0_HS_3_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_247408F6_0279_39B2_4169_0E488F421C9F",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_1883FA1B_0239_7871_4175_E19CC5D5E5FF",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_15911B1F_09D0_D4EA_4197_E7FAD8FEE9ED",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F58225F7_FF3B_E182_41EE_5523C7237D95_0_HS_6_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_1592FB02_09F0_D4DA_416F_D6D9DA45A92A",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F0160F_FF39_2282_41DA_E5D406CF2156_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_EF1F1D9D_FF49_2F03_41DD_17CFDC83B314",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2522E94A_0C62_F040_4182_3746B907C728",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F6DDE6_FF3B_6182_41E5_01DA4B633ED1_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2523B94A_0C62_F040_41A8_C643C6AC975E",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0_HS_1_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_247648FC_0279_39B6_417B_69BE74C10EBD",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0_HS_3_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_247788FD_0279_39B6_4180_95FD4E0871A4",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5824B5A_FF3A_E282_41E9_CCCFF57DC7A5_0_HS_4_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_0653D490_14B1_85CA_41A4_F4391CFD9D9F",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F582A940_FF3B_2EFE_41E9_44C71671137F_0_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_18847A1C_0239_7877_4158_A2D9E7431F6C",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_255DB949_0C62_F040_41A1_FC7C4E159FD2",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_25220949_0C62_F040_418F_A27DE9C6D09E",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F582C579_FF3B_668E_41C1_ACAD0FA22E38_0_HS_4_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_0FF5C4ED_1785_3D33_41B2_F218B859B30C",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0_HS_2_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_1885EA1D_0239_7871_4145_0152AC990E61",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_18858A1D_0239_7871_416F_0289D46C3D14",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5FE2FC0_FF39_E1FF_41CE_D70DD34EC63B_0_HS_5_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_0661F487_14B1_85D5_41A2_A3F160EC0A46",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E5C3DE44_FFCB_2D02_41B3_7CB3151AD9B9",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0_HS_5_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E5C2CE44_FFCB_2D02_41EA_1DD52B8E5958",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0_HS_6_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E8DF3692_FFC9_1D06_41CA_32C96EBD0A15",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5FE5DD9_FF39_218E_41EB_3C8A4D031E96_0_HS_8_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_0A481AC8_179C_F571_419D_35DCFE59B770",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0_HS_1_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2478F8FD_0279_39B6_4174_0AE776432956",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5ECE1CF_FF3A_E182_41D3_D1F84CDB20F2_0_HS_3_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_247878FE_0279_39B2_4178_71100BE1FB95",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_3CDEEF77_0D9F_7040_4191_E9E3ADBBDB98",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FE20AC_FF39_7F86_41A7_D0A831635742_0_HS_4_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_3CDECF77_0D9F_7040_4197_B2817776C392",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_189F1A19_0239_7871_417C_0E5B03C0EF02",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0_HS_3_0.png",
   "width": 720,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_189FFA19_0239_7871_4170_3A31CA91858C",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5F02B66_FF3B_2282_41CB_F3DC965ADCE9_0_HS_5_0.png",
   "width": 480,
   "height": 510,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_18800A19_0239_7871_417B_DB698FAE9A24",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_1_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_1E9E290D_0219_F856_4177_5D5B861AD1D3",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F581B66E_FF39_2282_41E0_4AF99C4A5C9B_0_HS_3_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_1E9FD90D_0219_F856_416A_8C8821EE7ABD",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2520194B_0C62_F040_4171_B4EAF4F95FB6",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F582B684_FF3B_2386_41EF_958A1B4B9CD5_0_HS_2_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_0FF774EE_1785_3D31_41B3_ADE5A902D2A2",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_37489E52_0C61_B041_415B_77B698DD636F",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FE60F4_FF39_1F86_41C9_1FF008138024_0_HS_4_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_374F8E53_0C61_B047_41A6_5DC3DA27FEF2",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0_HS_2_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E46D8808_FF57_1502_41DE_85F0F54C2131",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F04911_FF39_EE9E_41BD_EA2254B42B41_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E46DA808_FF57_1502_41DB_5DE9323643D0",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0_HS_2_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E5C51E45_FFCB_2D02_41E9_FF87767A8ED5",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0_HS_3_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E5C5DE45_FFCB_2D02_41E6_9EEAB1D4E0A5",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F147FF_FF39_E181_41C6_FBE5EB1907FD_0_HS_5_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E5C45E45_FFCB_2D02_41E3_2656395E341F",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0_HS_2_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2524994E_0C62_F040_4167_1150F67C3C84",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F581C873_FF39_6E82_41E5_2D1192608196_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2524C94E_0C62_F040_4195_D2EC3B9460D0",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2526094C_0C62_F040_4169_5EEE28C6237A",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F3D781_FF3B_227E_41DA_35C345153DE4_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2526C94D_0C62_F040_4196_E87115162426",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_18825A1A_0239_7873_4172_39E3A541F0FE",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_1882CA1B_0239_7871_4176_490E290CCA3B",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5F6EF89_FF3B_E18E_41E2_2B29776728C8_0_HS_5_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_15ED6AFF_09F0_D52A_419D_E9CE44DF7FC5",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E46C6809_FF57_1502_41B3_DE6747219800",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_3_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E46C2809_FF57_1502_41B5_BEBE2E3FE7D5",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_7_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E465080E_FF57_151E_41E9_A9CF9511080D",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_8_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E465280E_FF57_151E_41E5_DC525ED0598D",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_9_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E465C80E_FF57_151E_41D6_55F0941AE15E",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FE5DC1_FF39_21FE_41DC_707493DBD104_0_HS_11_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E465880F_FF57_151E_41DE_E248530E5EF7",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0_HS_2_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_15905B20_09D0_D4D6_4197_96727857527C",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F0CCDE_FF3B_E783_41ED_1DE8F6105A38_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_159FBB21_09D0_D4D6_4190_23A648548CD4",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5824EFE_FF3B_2382_41ED_6155DC151F38_0_HS_2_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2521694C_0C62_F040_417F_9E1C97B1084D",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0_HS_1_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_240F78F2_0279_39B2_4177_5CDE1AE45108",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5FE026B_FF39_2282_41B5_0F2204858344_0_HS_3_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2470C8F3_0279_39B2_4162_82262143A690",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0_HS_2_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_240D78F1_0279_39CE_417D_170A7ECBB166",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5EB0784_FF39_2187_41EF_7C13A026372D_0_HS_3_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_240D38F1_0279_39CE_413E_C1B9491E1C76",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0_HS_1_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2479A8FE_0279_39B2_416D_C98A95BCB798",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0_HS_3_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_247938FF_0279_39B2_416E_6058D024FC66",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F58258F8_FF3A_EF8E_41D9_2C74E149CA36_0_HS_5_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_255CE949_0C62_F040_415C_F65D46D3F258",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5FE2084_FF39_FF87_41D2_7A72482DB1DC_0_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_1884BA1D_0239_7871_4162_EB1B8842753A",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F581CE96_FF39_6382_41E7_E2755B74444F_0_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_18857A1C_0239_7877_416E_23CA2C8E9EB8",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_18858A1C_0239_7877_416B_5ACB07144C48",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F3BEE7B7_FF3B_2182_41BC_C98B525823B8_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_181BEB0C_0C66_B1C0_41A7_EDE3619436F4",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0_HS_1_0.png",
   "width": 560,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_29717C5B_09F7_CD6A_4197_77A9D346799E",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0_HS_2_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_29719C5C_09F7_CD6E_4154_08CE73AB87FA",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5F029E6_FF39_2182_41D1_70E0FD7DF46C_0_HS_5_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_25511941_0C62_F040_41A5_703B24395552",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_25325955_0C62_F040_4172_39E047378E8B",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5F168E6_FF39_6F82_41D0_79ECD91275D8_0_HS_2_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_0D5172E0_1787_1531_4186_C91AAFD29836",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_18814A1A_0239_7873_4156_24EBF7108883",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0_HS_4_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E464C80F_FF57_151E_41ED_1C8BC1A08470",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0_HS_5_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E464E810_FF57_1502_41D0_25615415A6F8",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F3421E_FF3B_2282_41E7_1261E7089C7C_0_HS_7_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_12997C52_09D3_CD7A_4179_1D2590FD0DFD",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F17FE9_FF3B_218E_41BE_6200C0A35F34_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2527894D_0C62_F040_4199_BC1F5868A431",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F67D0E_FF3B_6682_41EC_C3C599BC1D82_0_HS_2_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_06562493_14B1_85CE_418F_5B7C777AA272",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0_HS_4_0.png",
   "width": 560,
   "height": 540,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2472D8F4_0279_39B6_417A_8A53CB75B823",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5EAE0C8_FF39_1F8E_41C8_D60C1DADC81E_0_HS_5_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_247298F4_0279_39B6_417E_69D9FE01B00C",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0_HS_1_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_247588FB_0279_39B2_416B_CE6F6B1181B3",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0_HS_3_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_247518FC_0279_39B6_4149_8E3034F86130",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0_HS_5_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_25582945_0C62_F040_41A5_301B20C72830",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5EB0441_FF39_26FE_41EC_E9764933A848_0_HS_8_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_25592946_0C62_F040_4173_B6CD6723BFD3",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_0E14ADA9_14CE_87DA_41B1_18202FDAAA98",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F582F3FC_FF3B_6186_41C8_3165F010D7B0_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_0E175DAA_14CE_87DE_41B3_52E541198634",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_252BD950_0C62_F040_41A7_6E3403AD9466",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5F4571A_FF39_6283_41AB_C1AD7C49A46A_0_HS_4_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_0FFF04F9_1785_3D13_419B_42F6B3E3BD4C",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5FE22DC_FF36_E386_41B6_8017C0F9FFC0_0_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_18848A1C_0239_7877_4135_FB5233D400D0",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E46EF806_FF57_150E_41EB_DD411C21D778",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_1_0.png",
   "width": 480,
   "height": 510,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E46EA806_FF57_150E_4177_A47011FCEBA4",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_4_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E46D6807_FF57_150E_41D3_6EA9C85B7B88",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5E72603_FF39_2281_410D_D2CF25E55C50_0_HS_7_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_E46D3808_FF57_1502_41D6_BC7EE7FA4AC7",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_252F5953_0C62_F040_418A_48104B04AD3E",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FEC066_FF39_1E82_41E1_DB74A0CF20C4_0_HS_4_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_252F8953_0C62_F040_4165_651F7DF4CADC",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F581FFCB_FF39_6182_41E2_D6EB76625001_0_HS_2_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_252A994F_0C62_F040_4161_4E698CDBDB55",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_252C4954_0C62_F040_417B_667E955DD8AC",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F5F56890_FF39_6F9E_41BB_ED300D126577_0_HS_2_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_0D5262DE_1787_1511_41AE_D88E99DF3212",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_25293951_0C62_F040_4185_3FD55B13888B",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5EF97F6_FF39_2182_41E0_3C2BDEDAA5EB_0_HS_5_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2529F951_0C62_F040_4147_82BFA4F6C761",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_15935B1E_09D0_D4EA_4179_204A892872CA",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_F5FCB3F3_FF3B_E182_41E7_A10364C23F71_0_HS_3_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_1592AB1E_09D0_D4EA_419D_72AEF8A0BED3",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0_HS_1_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_247028F3_0279_39B2_4150_FD56337BB27E",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5ED7A89_FF39_238E_41A4_B6244F936E2A_0_HS_3_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_247188F3_0279_39B2_4176_CCA38C71AEB4",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0_HS_1_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_240E88F1_0279_39CE_417F_4C2C6E9F7402",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 21,
 "levels": [
  {
   "url": "media/panorama_F5FECFB6_FF39_2182_41E6_539ECF2D71DC_0_HS_4_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_2DDA273C_09F0_BB2D_41A3_34D388A64077",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "transparencyActive": true,
 "horizontalAlign": "center",
 "propagateClick": true,
 "minHeight": 1,
 "maxWidth": 60,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "paddingLeft": 0,
 "width": 60,
 "minWidth": 1,
 "borderSize": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "mode": "toggle",
 "height": 60,
 "shadow": false,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "data": {
  "name": "image button menu"
 }
},
{
 "transparencyActive": true,
 "horizontalAlign": "center",
 "propagateClick": true,
 "minHeight": 1,
 "maxWidth": 58,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "paddingLeft": 0,
 "width": 43,
 "minWidth": 1,
 "borderSize": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "mode": "push",
 "height": 54,
 "shadow": false,
 "click": "this.openLink('http://ethioairstrading.org/', '_blank')",
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "borderRadius": 0,
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton TWITTER"
 }
}],
 "width": "100%",
 "data": {
  "name": "Player468"
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
