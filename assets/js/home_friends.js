// CHANGE :: create a class to toggle Friends when a link is clicked, using AJAX
class ToggleFriend{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFriend();
    }


    toggleFriend(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks Friend the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {

                let ButtonText;
                if (data.data.Frendshipexists == true){
                    ButtonText = "Add Friend";
                    new Noty({
                        theme: 'relax',
                        text: "Remove Friend Successfully",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();    
                    
                }else{
                    ButtonText = "Remove Friend";
                    new Noty({
                        theme: 'relax',
                        text: "Add Friend Successfully",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();    
                }
                $(self).html(ButtonText);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
