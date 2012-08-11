(function() {

    function BaseControl(delegate, name, config) {
        this.delegate = delegate;
        this.name = name;
        this.config = config;
    }

    BaseControl.prototype = {
        setSource: function(params) {
            this.params = params;
            this._updateControls();
        },

        _updateControls: function() { },

        setValue: function(value) {
            if (!this.params || this.params[this.name] == value)
                return;
            this.params[this.name] = value;
            this._updateControls();
            if (this.delegate && this.delegate.valuesUpdated)
                this.delegate.valuesUpdated(this.name);
        },

        getValue: function(value) {
            if (!this.params)
                return;
            return this.params[this.name];
        },

        pushControls: function(parent) { },

        pushTableColumns: function(parent, elements) {
            $.each(elements, function(i, el) {
                $("<td />").append(el).appendTo(parent);
            });
        },

        createEditor: function(label) {
            return new Global.InlineEditor(this, label);
        }
    };

    var Controls = {
        _registeredControls: {},
        register: function(name, control) {
            this._registeredControls[name] = control;
        },

        get: function(typeName) {
            return this._registeredControls[typeName];
        }
    };

    Global.BaseControl = BaseControl;
    Global.Controls = Controls;

})();