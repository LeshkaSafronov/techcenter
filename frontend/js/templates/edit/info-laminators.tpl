<div class="new__field">
	<p class="new__field-name"> Тип ламинатора: </p>
	<div class="input-group new__input">
		<div class="checkbox">
			<% _.each(kinds, function(kind) { %>
	  			<label class='new__checkbox'><input id='<%= kinds.indexOf(kind) %>' class='kind' type="checkbox" value=""><%= kind %></label>
	  		<% }) %>
		</div>
	</div>
</div>