<div class="container">
    <div class="page-header" id="banner">
        <div class="row">
            <div class="col-lg-8 col-md-7 col-sm-6">
                <h1>users</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 col-md-5 col-sm-6 col-xs-10">
                <h2>This is an example of users</h2>
            </div>
            <pre>
      <?php
	      $auth = new erdiko\authenticate\BasicAuth(new \erdiko\users\models\User());
	      var_dump($auth->current_user());
      ?>
      </pre>
        </div>
    </div>
</div>