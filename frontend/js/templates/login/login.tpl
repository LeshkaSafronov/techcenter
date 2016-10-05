<form>
  <fieldset id="password-credentials">
    <div class="form-group">
      <input id='email' class="form-control" tabindex="1" placeholder="Электронная почта"/>
    </div>
    <div class="form-group">
      <input id='password' type="password" class="form-control" tabindex="2" placeholder="Пароль"/>
    </div>
    <div class="checkbox">
        <input name="session[remember_me]" type="hidden"/>
        <input type="checkbox" id="remember_me"/>
        <label for="remember_me">Запомнить меня</label>
    </div>
    <input id='submit' type="submit" name="commit" value="Войти" class="btn btn-inverse btn-large btn-block" />
    <br>
    <div class="text-center">
        или
        <a id="signup-link" href="javascript:void(0)">Создать новую учетную запись</a>
    </div>
  </fieldset>
</form>