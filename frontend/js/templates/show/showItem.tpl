<div id='main-info'></div>
<div id='advanced-info'></div>
<p class="header__text"> Цена: <%= price %> руб </p>
<div class='action-button__show'>
	<div id='for-cart'>
	  <button id='add_to_cart' type="button" class="btn btn-success">В корзину</button>
	  <input id='countItem' type="text" class="form-control" value=1>
	</div>
	<div>
		<button id='change' type="button" style="display: none;" class="btn btn-warning">Изменить</button>
		<button id='destroy' type="button" class="btn btn-danger">Удалить</button>
	</div>
</div>