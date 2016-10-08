<div>
  <table class='filter__table center-block'>
    <tbody>
      <tr>
        <tr>
          <td class="filter__header"><b>цена</b></td>
        </tr>
        <tr class='input_price__block'>
          <td> <span class="letter_filter"> от </span> <input id='left-range' value="0" class="input__price"> </td>
          <td> <span class="letter_filter"> до </span> <input id='right-range' value="1000" class="input__price"> </td>
        </tr>
        <tr>
          <td><input id="ex2" type="text" class="span2" value="" data-slider-min="10" data-slider-max="1000" data-slider-step="5" data-slider-value="[250,450]"/></td>
        </tr>
      </tr>
      <tr>
        <tr>
          <th class="filter__header"> Цветность печати </th>
        </tr>
        <tr>
          <td>
            <div class="option__text">
              <% _.each(colors, function(color) { %>
                <div class="checkbox">
                  <label><input type="checkbox" value=""> <%= color %> </label>
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
                  <label><input type="checkbox" value=""> <%= format %> </label>
                </div>
              <% }) %>
            </div>
          </td>
        </tr>
      </tr>

      <tr>
        <tr>
          <th class="filter__header"> Двусторонняя печать </th>
        </tr>
        <tr>
          <td>
            <div class="option__text">
              <% _.each(doublePrint, function(option) { %>
                <div class="checkbox">
                  <label><input type="checkbox" value=""> <%= option %> </label>
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
                  <label><input type="checkbox" value=""> <%= brand %> </label>
                </div>
              <% }) %>
            </div>
          </td>
        </tr>
      </tr>
    </tbody>
  </table>

  <br>
  <button type="button" class="btn btn-block btn-default center-block filter__btn">Фильтровать</button>
  <br>
</div>