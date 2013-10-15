(function(window, undefined) {

  var Analyzer = function(object) {
    this.extractProperties(object);
  };

  Analyzer.prototype.extractProperties = function(object) {
    this.props = this.props || {};
    for (var prop in object) {
      this.props[prop] = {
        type: typeof object[prop],
        value: object[prop]
      };
    }
  };

  Analyzer.prototype.getBody = function() {
    var body = document.getElementsByTagName('body');
    if (!body.length) {
      body = document.createElement('body');
      document.getElementsByTagName('html')[0].appendChild(body);
    }
    return body;
  };

  Analyzer.prototype.isCommonLibrary = function(propToCheck) {
    for (var prop in this.propSets) {
      if (this.propSets[prop].indexOf(propToCheck) > -1) {
        return true;
      }
    }
  }

  Analyzer.prototype.analyze = function() {
    var globalProps = this.props,
        cleanWindow = window,
        prop;

    // remove globals that exists in a clean window.
    for (prop in cleanWindow) {
      if (globalProps[prop]) {
        delete globalProps[prop];
      }
    }

    // remove globals that are specific to frameworks.
    for (prop in globalProps) {
      if (this.isCommonLibrary(prop)) {
        delete globalProps[prop];
      }
    }
    
    var body = this.getBody();
    for (prop in globalProps) {
      var el = document.createElement('p');
      el.innerHTML = prop;
      body.appendChild(el);
    }

  };

  Analyzer.prototype.propSets = {
    'Prototype':        '$$ $A $F $H $R $break $continue $w Abstract Ajax Class Enumerable Element Field Form ' +
                        'Hash Insertion ObjectRange PeriodicalExecuter Position Prototype Selector Template Toggle Try'.split(' '),

    'Scriptaculous':    'Autocompleter Builder Control Draggable Draggables Droppables Effect Sortable SortableObserver Sound Scriptaculous'.split(' '),
    'Firebug':          'loadFirebugConsole console _getFirebugConsoleElement _FirebugConsole _FirebugCommandLine _firebug'.split(' '),
    'Mozilla':          'Components XPCNativeWrapper XPCSafeJSObjectWrapper getInterface netscape GetWeakReference'.split(' '),
    'GoogleAnalytics':  'gaJsHost gaGlobal _gat _gaq pageTracker'.split(' ')
  };

  var openerAnalyer = new Analyzer(window.opener);
  openerAnalyer.analyze();

})(window);
