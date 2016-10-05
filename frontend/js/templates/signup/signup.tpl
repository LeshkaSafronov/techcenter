<form role="form">
  <fieldset id="password-credentials">
    <div class="form-group">
      <input id='name' class="form-control" tabindex="1" placeholder="Никнейм" type="text" name="user[name]"/>
    </div>
    <div class="form-group">
      <input id='email' class="form-control" tabindex="1" placeholder="Электронная почта" type="email" name="user[email]" data-error="Неверный формат email адреса" required/>
      <div class="help-block with-errors"></div>
    </div>
    <div class="form-group">
      <input id='password' class="form-control" tabindex="2" id="inputPassword" placeholder="Пароль" type="password" name="user[password]" data-minlength="6" data-error="Пароль слишком короткий" required/>
      <div class="help-block with-errors"></div>
    </div>
    <div class="form-group">
      <input id='password-confirmation' class="form-control" tabindex="2" placeholder="Подтверждение пароля" type="password" name="user[password_confirmation]"" data-match="#inputPassword" data-match-error="Пароли не совпадают" />
      <div class="help-block with-errors"></div>
    </div>
    <input id='submit' type="submit" name="commit" value="Зарегистрироваться" class="btn btn-inverse btn-large btn-block" />
  </fieldset>
</form>