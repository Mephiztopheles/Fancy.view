(function() {
    var VERSION = "0.0.1",
        logged  = false,
        ID      = 0,
        NAME    = "FancyView";

    function FancyView( el, settings ) {
        var SELF      = this;
        this.element  = el;
        this.settings = $.extend( {}, Fancy.settings [ NAME ], settings );
        if( !logged ) {
            logged = true;
            Fancy.version( this );
        }
        this.id = ID++;

        Fancy( this.element ).preventSelect();

        this.element.on( "mousedown", function( downEvent ) {
            downEvent.preventDefault();
            downEvent.stopPropagation();
            var start = {
                x: downEvent.pageX,
                y: downEvent.pageY
            };

            $( document ).on( "mousemove." + NAME + SELF.id, function( moveEvent ) {
                var moved = {
                    x: moveEvent.pageX,
                    y: moveEvent.pageY
                };
                SELF.element.scrollTop( SELF.element.scrollTop() + (start.y - moved.y) * SELF.settings.multiplierV );
                SELF.element.scrollLeft( SELF.element.scrollLeft() + (start.x - moved.x) * SELF.settings.multiplierH );
                start     = moved;
            } );

            $( document ).one( "mouseup." + NAME + SELF.id, function() {
                $( this ).off( "." + NAME + SELF.id )
            } );
        } );
    }

    FancyView.api = FancyView.prototype = {};
    FancyView.api.version   = VERSION;
    FancyView.api.name      = NAME;
    Fancy.settings [ NAME ] = {
        multiplierH: 1,
        multiplierV: 1
    };

    Fancy.view       = VERSION;
    Fancy.api.view   = function( settings ) {
        return this.set( NAME, function( el ) {
            return new FancyView( el, settings );
        }, true );
    };
    window.FancyView = FancyView;
})
();