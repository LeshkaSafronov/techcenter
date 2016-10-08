<div class='center-block'>
	<a class='item' href='javascript:void(0)'>
		<figure class="col-xs-6 col-md-4">
		  <figcaption> <b> <%= name %> </b> <br/> <%= price %> тенге.</figcaption>
		  <img class='list-image' src= <%= printer_photo %> >
		  <figcaption><%= rating %>/10</figcaption>
		  <figcaption>
		    <button id='show' type="button" class="btn btn-default">Подробнее</button>
		    <button id='cart' type="button" class="btn btn-primary">В корзину</button>
		  </figcaption>
		  <br>
		</figure>
	</a>
</div>