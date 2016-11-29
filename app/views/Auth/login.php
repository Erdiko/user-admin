<div class="container">
  <div class="row">
    <div class="col-md-4 offset-2">
      <h1>Login</h1>
      <hr>
      <form class="form-signin" action="/login" method="post">
        <h3 class="form-signin-heading">Please sign in</h3>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required="">

        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </div>
  </div>
</div>