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
				  	<% var keys = _.keys(Config.Dict_New); %>
				  	<% _.each(keys, function(key) {  %>
				  		<li><a id ='<%= key %>' class='category' href='javascript:void(0)'> <%= Config.Dict_New[key] %> </a></li>
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
				<p class="new__field-name"> Теги: </p>
				<div class="input-group new__input">
	  				<input type="text" class="form-control" placeholder="" aria-describedby="sizing-addon2">
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
		  	<div class="new__field-thumb">
		  		<div class="thumb-photo">
		  			<img class='remove_img' src='images/remove.png'>
		  			<img class='upload__photo' src='images/1.png'>
		  		</div>
		  		<div class="thumb-photo">
		  			<img class='remove_img' src='images/remove.png'>
		  			<img class='upload__photo' src='images/2.png'>
		  		</div>
		  		<div class="thumb-photo">
		  			<img class='remove_img' src='images/remove.png'>
		  			<img class='upload__photo' src='images/1.png'>
		  		</div>
		  		<div class="thumb-photo">
		  			<img class='remove_img' src='images/remove.png'>
		  			<img class='upload__photo' src='images/1.png'>
		  		</div>
		  		<div class="thumb-photo">
		  			<img class='remove_img' src='images/remove.png'>
		  			<img class='upload__photo' src='images/2.png'>
		  		</div>
		  		<div class="thumb-photo">
		  			<img class='remove_img' src='images/remove.png'>
		  			<img class='upload__photo' src='images/1.png'>
		  		</div>
		  		<div class="thumb-photo">
		  			<img class='remove_img' src='images/remove.png'>
		  			<img class='upload__photo' src='images/1.png'>
		  		</div>
		  		<div class="thumb-photo">
		  			<img class='remove_img' src='images/remove.png'>
		  			<img class='upload__photo' src='images/2.png'>
		  		</div>
		  	</div>


		  	<div class="new__field">
	  			<button type="button" class="btn btn-success">Добавить фото</button>
		  	</div>
			<div class="new__field-save">
		  		<button id='save' type="button" class="btn btn-default">Сохранить</button>
		  	</div>
	  	</div>
	</div>
</div>