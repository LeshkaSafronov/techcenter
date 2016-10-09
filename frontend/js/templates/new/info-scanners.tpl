<div class="new__field">
	<p class="new__field-name"> Тип сканера: </p>
	<div class="input-group new__input">
		<div class="checkbox">
			<% _.each(kinds, function(kind) { %>
	  			<label class='new__checkbox'><input id='<%= kinds.indexOf(kind) %>' class='kind' type="checkbox" value=""><%= kind %></label>
	  		<% }) %>
		</div>
	</div>
</div>

<div class="new__field">
	<p class="new__field-name"> Автоподача: </p>
	<div class="input-group new__input">
		<div class="checkbox">
			<% _.each(automaticFeed, function(option) { %>
	  			<label class='new__checkbox'><input id='<%= automaticFeed.indexOf(option) %>' class='automaticFeed' type="checkbox" value=""> <%= option %> </label>
	  		<% }) %>
		</div>
	</div>
</div>

<div class="new__field">
	<p class="new__field-name"> Максимальный формат: </p>
	<div class="input-group new__input">
		<div class="checkbox">
			<% _.each(maxFormats, function(format) { %>
	  			<label class='new__checkbox'><input id='<%= maxFormats.indexOf(format) %>' class='format' type="checkbox" value=""><%= format %></label>
	  		<% }) %>
		</div>
	</div>
</div>

<div class="new__field">
	<p class="new__field-name"> Двустороннее сканирование: </p>
	<div class="input-group new__input">
		<div class="checkbox">
			<% _.each(doubleScan, function(option) { %>
	  			<label class='new__checkbox'><input id='<%= doubleScan.indexOf(option) %>' class='doubleScan' type="checkbox" value=""><%= option %></label>
	  		<% }) %>
		</div>
	</div>
</div>

<div class="new__field">
	<p class="new__field-name"> Производитель: </p>
	<div class="input-group new__input">
		<div class="checkbox">
			<% _.each(brands, function(brand) { %>
  				<label class='new__checkbox'><input id='<%= brands.indexOf(brand) %>' class='brand' type="checkbox" value=""><%= brand %></label>
  			<% }) %>
		</div>
	</div>
</div>