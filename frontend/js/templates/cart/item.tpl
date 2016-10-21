<td><%= item_id %></td>
<td><img src='images/1.png' class="cart__photo"></td>
<td class='cart__text'><%= name %></td>
<td><%= price %></td>
<td>
	<div class='cart__quantity-container'>
    	<button id='remove' type="button" class="btn btn-default">-</button>
    	<p class="count__quantity"><%= count %></p>
    	<button id='add' type="button" class="btn btn-default">+</button>
    </div>
</td>
<td><%= totalPrice %></td>