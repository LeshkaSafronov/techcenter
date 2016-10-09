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
          <th class="filter__header"> Тип </th>
        </tr>
        <tr>
          <td>
            <div class="option__text">
              <% _.each(types, function(type) { %>
                <div class="checkbox">
                  <label><input type="checkbox" value=""> <%= type %> </label>
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