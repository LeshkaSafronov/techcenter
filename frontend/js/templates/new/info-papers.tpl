<div class="new__field">
	<p class="new__field-name"> Формат: </p>
	<div class="input-group new__input">
		<div class="checkbox">
			<% _.each(formats, function(format) { %>
	  			<label class='new__checkbox'><input type="checkbox" value=""> <%= format %> </label>
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