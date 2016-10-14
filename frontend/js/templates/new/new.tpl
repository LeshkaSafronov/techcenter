<div class='new__form'>
	<div class="form__container center-block">
		<p class="new__header"> Добавить товар </p>
		<div>
			<div class="new__field">
				<p class="new__field-name"> Название: </p>
				<div class="input-group new__input">
	  				<input id='name' type="text" class="form-control">
	  			</div>
	  		</div>
	  		<div class="new__field">
		  		<div class="btn-group">
				  <button id='group' type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Выберите категорию <span class="caret"></span>
				  </button>
				  <ul class="dropdown-menu">
				  	<% var keys = _.keys(Config.Dict); %>
				  	<% _.each(keys, function(key) {  %>
				  		<li><a id ='<%= key %>' class='category' href='javascript:void(0)'> <%= Config.Dict[key] %> </a></li>
				  	<% }) %>
				  </ul>
				</div>
			</div>
	  		<div class="new__field">
				<p class="new__field-name"> Описание: </p>
				<div class="input-group new__input">
	  				<textarea id='description' class="form-control" rows="5"></textarea>
	  			</div>
	  		</div>
	  		<div id='info-region'></div>
	  		<div class="new__field">
	  			<div class="new__field-weight">
					<p class="new__field-name"> Вес: </p>
					<div class="input-group new__input-weight">
		  				<input id='weight' type="text" class="form-control">
		  			</div>
		  			<p> кг </p>
		  		</div>
		  	</div>
	  		<div class="new__field">
	  			<div class="new__field-profile">
					<p class="new__field-name"> Габариты: </p>
					<div class="input-group new__input-profile">
		  				<input id='width' type="text" class="form-control" placeholder="">
		  			</div>
		  			<p> X </p>
		  			<div class="input-group new__input-profile">
		  				<input id='height' type="text" class="form-control">
		  			</div>
		  			<p> X </p>
		  			<div class="input-group new__input-profile">
		  				<input id='depth' type="text" class="form-control">
		  			</div>
		  		</div>
	  		</div>
	  		<div class="new__field">
	  			<div class="new__field-price">
					<p class="new__field-name"> Цена: </p>
					<div class="input-group new__input">
		  				<input id='price' type="text" class="form-control">
		  			</div>
		  			<p> тенге </p>
		  		</div>
		  	</div>
			<div class="new__field-save">
		  		<button id='save' type="button" class="btn btn-default" disabled>Сохранить</button>
		  	</div>
	  	</div>
	</div>
</div>