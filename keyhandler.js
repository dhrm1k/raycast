const GameInput = {
    keys: {},

    init: function() {
        window.addEventListener("keydown", (event) => {
            this.keys[event.key] = true;
            // console.log(event.key)
        });

        window.addEventListener("keyup", (event) => {
            this.keys[event.key] = false;
        });
    },


    isKeyPressed: function(key) {
        return this.keys[key] === true
    }
}


GameInput.init()
//add comments on what/how is this make a object syntax.
