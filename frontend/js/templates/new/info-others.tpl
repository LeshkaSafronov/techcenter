<div class="new__field">
	<p class="new__field-name"> Тип: </p>
	<div class="input-group new__input">
		<div class="checkbox">
			<% _.each(types, function(type) { %>
	  			<label class='new__checkbox'><input type="checkbox" value=""> <%= type %> </label>
	  		<% }) %>
		</div>
	</div>
</div>