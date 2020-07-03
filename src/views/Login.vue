<template>
  <div class="login container">
   
        <div>
 <h3>Log In</h3>
            <form>
      <div class="form-group">
        <label for="logemail">Email address</label>
        <input
          type="email"
          class="form-control"
          id="logemail"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="log-password">Password</label>
        <input
          type="password"
          class="form-control"
          id="log-password"
          placeholder="Password"
        />
      </div>
      <!-- <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div> -->
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
        </div>
        <div >
            <h3>Sign Up</h3>
            <form>
      <div class="form-group">
        <label for="sign-email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="sign-email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="sign-pass">Password</label>
        <input
          type="password"
          class="form-control"
          id="sign-pass"
          placeholder="Password"
        />
      </div>
     <!--  <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div> -->
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
        </div>
    
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped>
</style>