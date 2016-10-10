<div>
  <table class='filter__table center-block'>
    <tbody>
      <tr>
        <tr>
          <td class="filter__header"><b>цена</b></td>
        </tr>
        <tr class='input_price__block'>
          <td> <span class="letter_filter"> от </span> <input id='left-range' value="<%= min %>" class="input__price"> </td>
          <td> <span class="letter_filter"> до </span> <input id='right-range' value="<%= max %>" class="input__price"> </td>
        </tr>
        <tr>
          <td><input id="ex2" type="text" class="span2" value="" data-slider-min="<%= min %>" data-slider-max="<%= max %>"/></td>
        </tr>
      </tr>
      <tr>
        <tr>
          <th class="filter__header"> Тип сканера </th>
        </tr>
        <tr>
          <td>
            <div class="option__text">
              <% _.each(kinds, function(kind) { %>
                <div class="checkbox">
                  <label><input class='kind' type="checkbox" value=""><%= kind %></label>
                </div>
              <% }) %>
            </div>
          </td>
        </tr>
      </tr>

      <tr>
        <tr>
          <th class="filter__header"> Автоподача </th>
        </tr>
        <tr>
          <td>
            <div class="option__text">
              <% _.each(automaticFeed, function(option) { %>
                <div class="checkbox">
                  <label><input class='automaticFeed' type="checkbox" value=""><%= option %></label>
                </div>
              <% }) %>
            </div>
          </td>
        </tr>
      </tr>

      <tr>
        <tr>
          <th class="filter__header"> Двустороннее сканирование </th>
        </tr>
        <tr>
          <td>
            <div class="option__text">
              <% _.each(doubleScan, function(option) { %>
                <div class="checkbox">
                  <label><input class='doubleScan' type="checkbox" value=""><%= option %></label>
                </div>
              <% }) %>
            </div>
          </td>
        </tr>
      </tr>

      <tr>
        <tr>
          <th class="filter__header"> Максимальный формат </th>
        </tr>
        <tr>
          <td>
            <div class="option__text">
              <% _.each(maxFormats, function(format) { %>
                <div class="checkbox">
                  <label><input class='format' type="checkbox" value=""><%= format %></label>
                </div>
              <% }) %>
            </div>
          </td>
        </tr>
      </tr>

      <tr>
        <tr>
          <th class="filter__header"> Производитель </th>
        </tr>
        <tr>
          <td>
            <div class="option__text">
              <% _.each(brands, function(brand) { %>
                <div class="checkbox">
                  <label><input class='brand' type="checkbox" value=""><%= brand %></label>
                </div>
              <% }) %>
            </div>
          </td>
        </tr>
      </tr>
    </tbody>
  </table>

  <br>
  <button id='submit' type="button" class="btn btn-block btn-default center-block filter__btn">Фильтровать</button>
  <br>
</div>