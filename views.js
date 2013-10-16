var ApiConsumerView = Backbone.View.extend({
    el: 'body',
    gravatarEl: '.js_gravatar',
    emptyTemplate: _.template($('#profile_empty_template').html()),
    errorTemplate: _.template($('#profile_error_template').html()),
    loadingTemplate: _.template($('#profile_loading_template').html()),
    gravatarTemplate: _.template($('#profile_image_template').html()),

    events: {
        "click .js_search": "searchCoder",
        "keypress .js_search_text": "searchCoder"
    },

    initialize: function(){
        $(this.gravatarEl).html(this.gravatarTemplate({'avatar_url': 'coder.png'}));
    },

    set_gravatar: function(model){
        $(this.gravatarEl).html(this.gravatarTemplate(model.attributes));
    },

    set_loading_template: function(view_el) {
        view_el.html(this.loadingTemplate());
    },

    set_error_template: function(view_el) {
        view_el.html(this.errorTemplate());
    },

    searchCoder: function(e) {
        if (e.keyCode && e.keyCode != 13) { return }
        var person = new PersonGithubModel();
        person_view = new PersonGithubView({model: person});
        person.fetch();

        var person = new PersonCoderwallModel();
        person_view = new PersonCoderwallView({model: person});
        person.fetch();

        var person = new PersonStackOverFlowModel();
        person_view = new PersonStackOverFlowView({model: person});
        person.fetch();
    }
});

var PersonGithubView = ApiConsumerView.extend({
    el: '.js_show_github_profile',
    template: _.template($('#profile_github_template').html()),

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.set_loading_template(this.$el);
    },

    render: function(){
        this.set_gravatar(this.model);
        this.$el.html(this.template(this.model.attributes));
    }
});


var PersonCoderwallView = ApiConsumerView.extend({
    el: '.js_show_coderwall_profile',
    template: _.template($('#profile_coderwall_template').html()),

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'error', this.not_found);
        this.set_loading_template(this.$el);
    },

    render: function(){
        this.$el.html(this.template(this.model.attributes.data));
    },

    not_found: function(){
        this.set_error_template(this.$el);
    }
});


var PersonStackOverFlowView = ApiConsumerView.extend({
    el: '.js_show_stackoverflow_profile',
    template: _.template($('#profile_stackoverflow_template').html()),

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'error', this.not_found);
        this.set_loading_template(this.$el);
    },

    render: function() {
        if (this.model.attributes.items.length > 0) {
            this.$el.html(this.template(this.model.attributes.items[0]));
        }
        else {
            this.$el.html(this.emptyTemplate());
        }
    },

    not_found: function(){
        this.set_error_template(this.$el);
    }
});
