<!DOCTYPE html>
<html lang="de">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title>Capos Einträge</title>
	<meta name="description" content="">
	<meta name="author" content="">

	<meta name="viewport" content="width=device-width">

	<link rel="stylesheet" href="css/bootstrap.css">
	<link rel="stylesheet" href="css/styles.css">
	
</head>
<body>
	<h2>Einträge</h2>
	<table class="table table-striped">
		<thead>
			<tr>
				<td>Bezeichnung</td>
				<td></td>
				<td></td>
			</tr>
		</thead>
  	<?php
  		$db = mysqli_connect("localhost", "root", "", "capos");
		$ergebnis = mysqli_query($db, "SELECT * FROM eintraege");
		while($row = mysqli_fetch_object($ergebnis))
		{
		  echo ('<tr data-rowID="'.$row->id.'"><td>'.$row->bezeichnung.'</td><td><button class="btn btn-danger btn-delete" data-id="'.$row->id.'">löschen</button></td><td></td></tr>');
		}
  	?>
	</table>

	<h3>Neuen Eintrag hinzufügen</h3>
	<form role="form" action="" id="myForm" method="post">
	  <div class="form-group">
	    <label for="exampleInputBezeichnung">Bezeichnung</label>
	    <input type="text" class="form-control" id="exampleInputBezeichnung" placeholder="Bezeichnung">
	  </div>
	  <button type="submit" class="btn btn-success btn-default">speichern</button>
	</form>

</body>
	<script src="js/jquery.js"></script>
	<script src="js/main.js"></script>
</html>
<?php
?>