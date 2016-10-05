<div class="col-md-4 user-panel center-block">
  <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title"><%= name %></h3>
      </div>
    <div class="panel-body">
      <div class='user-info'>  
        <img class="img-thumbnaisl" src="images/missing.png" alt="Front" />
        <ul>
          <li>
            Email: <%= email %>
          </li>
          <li>
            Адрес: <%= address %>
          </li>
          <li>
            Телефонный номер: <%= number %>
          </li>
        </ul>
      </div>
      <div class="form-group">
        <form class="button_to"><input id='edit' class="btn btn-large btn-inverse btn-block" type="submit" value="Редактировать" /></form>
        <form class="button_to"><input id='logout' class="btn btn-large btn-inverse btn-block" type="submit" value="Выйти"></form>
      </div>
    </div>
  </div>
</div>