<div class="menu" style="">
  <div class="menu">
    <table class="table table-hover table-inverse table-borderless">
      <tbody class="menu__item">

        <% _.each(columns, function(column) { %>
          <tr>
            <td id='<%= column %>' class='nav'>
              <a href="javascript:void(0)" style="text-decoration:none"><b><%= Config.Dict[column] %></b></a>
            </td>
          </tr>
        <% }) %>


        <tr>
          <td>
            <a href="javascript:void(0)" style="text-decoration:none"><b><hr></b></a>
          </td>
        </tr>

        <tr>
          <td>
            <a id='cart' href="javascript:void(0)" class='nav-mobile__menu' style="text-decoration:none">
              <div class="nav-mobile__link">
                <b>В корзине&nbsp&nbsp</b>
                <span id='count' class="badge"><%= !_.isUndefined(sum) ? sum : '' %></span>
              </div>
              <img src="images/i/cart.png" alt="Cart" />
            </a>
          </td>
        </tr>

        <tr>
          <td>
            <a id='help' href="javascript:void(0)" class='nav-mobile__menu' style="text-decoration:none">
              <div class="nav-mobile__link">
                <b>Помощь&nbsp</b>
              </div>
              <img src="images/i/help.png" alt="Help" />
            </a>
          </td>
        </tr>

        <tr>
          <td>
            <a id='login' href="javascript:void(0)" class='nav-mobile__menu' style="text-decoration:none">
              <div class="nav-mobile__link">
                <b><%= _.isUndefined(name) ? 'Логин' : name %>&nbsp&nbsp</b>
              </div>
              <img src="images/i/login.png" alt="User" />
            </a>
          </td>
        </tr>

        
      </tbody>
    </table>
  </div>
</div>