(function ( $ ) {
    
    $.fn.search = function( options ) {        
        return this.each(function() {
                var scope = this;
                var $this = $(this);
                var defaults = {
                    delay:600,
                    models:[],                                                                
                    apiUrlPrefix: "http://127.0.0.1:1337/search",
                    onSearchStart: function() {},
                    onSearchComplete: function() {},
                    onSearchItemWiseResult: function() {},
                };

                $this.config = $.extend({}, defaults, options );
                
                var interval = null;
                var results = [];
                var totalSearchCnt = 0;
                var totalResultCnt = 0;
                var totalFailedCnt = 0;
                var lastQuery = "";


                $this.findContent = function(query) {
                    if (query === undefined || query === null || query === "") {
                        console.log("No content to search.", query);                    
                        return;
                    }
                    if(query === lastQuery) {
                        console.log("Results for same content already listed.");
                        return;
                    }
                    
                    lastQuery = query;

                    results = [];
                    totalSearchCnt = 0;
                    totalResultCnt = 0;
                    totalFailedCnt = 0;
                    
                    $this.config.onSearchStart.call(scope);
                    $.each($this.config.models, function(index,model) { $this.configureModel(index, model,query) });
                };

                $this.configureModel = function(index, model,query) {
                    var search = model.search;
                    var ctotal = search.length;
                    if (ctotal > 0) {
                        var params = "";
                        var words = query.split(" "); //.each(function(ele){return $.trim(ele);});
                        var total = words.length;
                
                        for (var i = 0; i < total; i++) {
                            var word = words[i];
                            for (var j = 0; j < ctotal; j++) {
                                params += search[j] + "=" + word;
                                if (j < ctotal - 1) params += "&";
                            }
                            if (i < total - 1) params += "&";
                        }
                
                
                        if (model.api != undefined && model.api != null) model.api.abort();
                
                        totalSearchCnt++;
                
                        var url  = $this.config.apiUrlPrefix + "/" + model.name;
                            url += "?" + params;
                            url += "&_start=" + (model.start !== undefined && model.start !== null ? model.start : 0);
                            url += "&_limit=" + (model.limit !== undefined && model.limit !== null ? model.limit : 10);
                
                        model.api = $.ajax({
                            url:url,
                            type:'GET',
                            dataType:'json',
                            crossDomain : true,                            
                            error:function (data,result) {
                                // console.log("Failed", data,result);                            
                                totalFailedCnt++;
                                $this.onModelData("failed",model,data)                            
                            },
                            success:function(data){
                                // console.log("Success",data, index, model);
                                totalResultCnt++;
                                $this.onModelData("success",model,data);  
                            }, 
                        });
                
                        model.query = query;
                        model.params = params;
                        model.url = url;
                    }                
                };
                
                $this.onModelData = function(status,model,items){
                    // console.log("onModelData", status,model,items);
                                                                   
                    if (items !== null && items !== undefined && items.length > 0) {                                                                        
                        var content = $this.config.onSearchItemWiseResult.call(scope,model,items,results.length); 
                        results.push({model:model,items:items, html:content});                      
                    }
                    
                    // console.log(totalSearchCnt,totalResultCnt,totalFailedCnt);

                    if (totalSearchCnt === (totalResultCnt + totalFailedCnt)) {
                        $this.config.onSearchComplete.call(scope,results);                        
                    }
                };

                $this.keyup(function(){                    
                    var query = $.trim($(this).val());
                    if (interval !== undefined && interval !== null) clearInterval(interval);
                    interval = setTimeout(function () {
                        $this.findContent(query);
                    }, $this.config.delay);
                });
        });        
    }; 
}( jQuery ));