<div class="new__field">
	<p class="new__field-name"> Цветность печати: </p>
	<div class="input-group new__input">
		<div class="checkbox">
			<% _.each(colors, function(color) { %>
	  			<label class='new__checkbox'><input type="checkbox" value=""> <%= color %> </label>
	  		<% }) %>
		</div>
	</div>
</div>

<div class="new__field">
	<p class="new__field-name"> Максимальный формат: </p>
	<div class="input-group new__input">
		<div class="checkbox">
			<% _.each(maxFormats, function(format) { %>
	  			<label class='new__checkbox'><input type="checkbox" value=""> <%= format %> </label>
	  		<% }) %>
		</div>
	</div>
</div>

<div class="new__field">
	<p class="new__field-name"> Двусторонняя печать: </p>
	<div class="input-group new__input">
		<div class="checkbox">
			<% _.each(doublePrint, function(option) { %>
	  			<label class='new__checkbox'><input type="checkbox" value=""> <%= option %> </label>
	  		<% }) %>
		</div>
	</div>
</div>

<div class="new__field">
	<p class="new__field-name"> Производитель: </p>
	<div class="input-group new__input">
		<div class="checkbox">
			<% _.each(brands, function(brand) { %>
  				<label class='new__checkbox'><input type="checkbox" value=""> <%= brand %> </label>
  			<% }) %>
		</div>
	</div>
</div>