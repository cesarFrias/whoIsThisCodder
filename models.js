var PersonGithubModel = Backbone.Model.extend({
    url: function() {
        return 'https://api.github.com/users/' + $('input').val();
    },

    parse: function(data) {
        if (!data.company) {
            data.company = null;
        }
        if (!data.age) {
            data.age = null;
        }
        data.place = data.location;
        return data;
    }
});

var PersonCoderwallModel = Backbone.Model.extend({
    url: function() {
        return 'https://coderwall.com/' + $('input').val() + '.json?callback=?';
    },

    parse: function(data) {
        data.data.place = data.data.location;
        return data;
    }
});

var PersonStackOverFlowModel = Backbone.Model.extend({
    url: function() {
        return 'https://api.stackexchange.com/2.1/users?order=desc&sort=reputation&site=stackoverflow&inname=' + $('input').val();
    },

    parse: function(data) {
        if (data.items.length == 1) {
            if (!data.items[0].company) {
                data.items[0].company = null;
            }
            if (!data.items[0].age) {
                data.items[0].age = null;
            }
            data.items[0].place = data.items[0].location;
            return data;
        }
        else {
            this.trigger('error');
        }
    }
});
