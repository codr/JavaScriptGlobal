(function(window, undefined) {

  var Analyzer = function() {

  }

  Analyzer.prototype.analyze = function() {
    var globalProps = window.opener,
        cleanWindow = window;
        
    for (var prop in cleanWindow) {
      if (globalProps[prop]) {
        delete globalProps[prop];
      }
    }
    
    var body = document.getElementByTagName('body');
    for (var prop in globalProps) {
      var el = document.createElement('p');
      el.innerHTML = prop;
      body.appendChild(el);
    }

    console.dir(globalProps);
    console.log('Total number of properties: ' + getPropsCount(globalProps));
  }

  Analyzer.prototype.propSets = {
    'Prototype':        '$$ $A $F $H $R $break $continue $w Abstract Ajax Class Enumerable Element Field Form ' +
                        'Hash Insertion ObjectRange PeriodicalExecuter Position Prototype Selector Template Toggle Try'.split(' '),

    'Scriptaculous':    'Autocompleter Builder Control Draggable Draggables Droppables Effect Sortable SortableObserver Sound Scriptaculous'.split(' '),
    'Firebug':          'loadFirebugConsole console _getFirebugConsoleElement _FirebugConsole _FirebugCommandLine _firebug'.split(' '),
    'Mozilla':          'Components XPCNativeWrapper XPCSafeJSObjectWrapper getInterface netscape GetWeakReference'.split(' '),
    'GoogleAnalytics':  'gaJsHost gaGlobal _gat _gaq pageTracker'.split(' ')
  };

  var examine = new Analyzer();
  examime.analyze();

})(window);
