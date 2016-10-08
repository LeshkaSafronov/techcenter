<header class="black">
  <div class="container flexible-header">
    <div><a id='main' href='javascript:void(0)'><img src="images/i/logo.png" alt="Logo" /></a></div>
    <div class='search'>
      <div class="input-group">
            <span class="input-group-btn">
              <button id='submit' type="submit" class="btn btn-default" type="button">
                <img src='images/i/search.png' height="20px">
              </button>
            </span>
            <input id='search' type="text" class="form-control" placeholder="Поиск" name="req">
      </div>
    </div>
    <div class="hidden-xs hidden-sm">
      <a class="header" href="/cart/">
          <div class="header">
            В корзине&nbsp&nbsp
            <span id='count' class="badge"> <%= !_.isUndefined(sum) ? sum : '' %> </span>
            &nbsp
              <img src="images/i/cart.png" alt="Cart" />
            
          </div>
</a>    </div>
    <a href="/help" class="header"><div class="hidden-xs hidden-sm header">Помощь&nbsp<img src="images/i/help.png" alt="Help" /></div></a>
      <a id='login' href='javascript:void(0)' class="header"><div class="hidden-xs hidden-sm header"><%= _.isUndefined(name) ? 'Логин' : name %>&nbsp&nbsp<img src="images/i/login.png" alt="User" /></div></a>
  </div>
</header>