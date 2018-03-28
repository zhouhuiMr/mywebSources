window.onload = function(){
    /*================================*/
    /*                                */
    /*        the parameters          */
    /*                                */
    /*================================*/
    var GAMEWIDTH = document.body.offsetWidth,
        GAMEHEIGHT = document.body.offsetHeight;
    var WORLDWIDTH = 1920,
        WORLDHEIGHT = 960;
    var wall_width = WORLDWIDTH,
        wall_height = 700;
    var ground_width = WORLDWIDTH,
        ground_height = WORLDHEIGHT - wall_height;

    var cursors = null;

    var game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'stageContainer', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    /*================================*/
    /*                                */
    /*    the config of phaser.js     */
    /*                                */
    /*================================*/

    //resources loading
    function preload(){
        game.load.onLoadStart.add(loadStart, this);
        game.load.onFileComplete.add(filecomplete, this);
        game.load.onLoadComplete.add(loadcomplete, this);
        game.load.atlas('ground','img/ground/ground.png','img/ground/ground.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('furniture','img/furniture/furniture.png','img/furniture/furniture.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    }
    function loadStart(){
        console.info("resources loading  starts");
    }
    function filecomplete(progress, cacheKey, success, totalLoaded, totalFiles){
        console.info("resources is loading" );
    }
    function loadcomplete(){
        console.info("resources loading  is completed");
    }

    var object_bounce = 0;
    var wall = null,
        ground = null;
    var tvstand = null,
        bookcase = null,
        bookrack = null;

    //create object
    function create(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 1500;

        game.world.setBounds(0, 0, WORLDWIDTH, WORLDHEIGHT);
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

        wall = game.add.tileSprite(0,0,wall_width,wall_height,'ground','wall.png');

        //ground
        ground = game.add.tileSprite(0,wall_height,ground_width,ground_height,'ground','ground.png');
        game.physics.enable(ground,Phaser.Physics.ARCADE);
        ground.body.collideWorldBounds = true;
        ground.body.immovable = true;
        ground.body.allowGravity = false;

        //tvstand
        tvstand = game.add.sprite(game.world.centerX,0,'furniture','tvstand.png');
        tvstand.anchor.set(0.5,1);
        game.physics.enable(tvstand,Phaser.Physics.ARCADE);
        tvstand.body.bounce.y = object_bounce;

        //bookcase
        bookcase = game.add.sprite(game.world.centerX-tvstand.width/2-160,0,'furniture','bookcase.png');
        bookcase.anchor.set(0.5,1);
        game.physics.enable(bookcase,Phaser.Physics.ARCADE);
        bookcase.body.bounce.y = object_bounce;
        bookcase.body.allowGravity = false;

        //bookrack
        bookrack = game.add.sprite(game.world.centerX+tvstand.width/2+230,0,'furniture','bookrack.png');
        bookrack.anchor.set(0.5,1);
        game.add.tween(bookrack).to({y:300},1000,Phaser.Easing.Quartic.Out,true);
        game.physics.enable(bookrack,Phaser.Physics.ARCADE);
        bookrack.body.allowGravity = false;

        cursors = game.input.keyboard.createCursorKeys();
    }

    //stage  update
    function update(){
        game.physics.arcade.collide(ground, [tvstand,bookcase]);

        if(tvstand.y > 200 && !bookcase.body.allowGravity){
            bookcase.body.allowGravity = true;
        }


        if (cursors.up.isDown)
        {
            game.camera.y -= 4;
        }
        else if (cursors.down.isDown)
        {
            game.camera.y += 4;
        }

        if (cursors.left.isDown)
        {
            game.camera.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            game.camera.x += 4;
        }
    }

    //stage render
    function render(){
        game.debug.cameraInfo(game.camera, 500, 32);
        // game.debug.body(tvstand);
    }
};

