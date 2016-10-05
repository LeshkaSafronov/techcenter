<div class="menu center-block">
	<div class="hidden-xs hidden-sm menu">
	  <div class='text-center menu__header'>
	  	<p><b> Каталог товаров </b></p>
	  </div>
	  <table class="table table-hover table-inverse table-borderless">
	  	<tbody class='menu__item'>
		    <% _.each(columns, function(column) { %>
		      <tr>
		        <td class='nav' id=<%= column %> >
		        	<a href='javascript:void(0)'><b><%= Config.Dict[column] %></b></a>
		        </td>
		      </tr>
		    <% }) %>
		</tbody>
	  </table>
	</div>
</div>