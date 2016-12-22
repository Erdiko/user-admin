<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">

<?php
    /** Spit out meta tags **/
    foreach ($this->getMeta() as $name => $content)
        echo "<meta name=\"{$name}\" content=\"{$content}\">\n";
?>

<title><?php echo $this->getPageTitle(); ?></title>

<?php
  // Spit out CSS
foreach ($this->getCss() as $css) {
    if ($css['active']) {
        echo "<link rel='stylesheet' href='".$css['file']."' type='text/css' />\n";
    }
}
?>
<base href="/dashboard/">
</head>
<body>

<div id="pagewrap">
    <div class="container content-main">
    <?php echo $this->getContent(); ?>
    </div>
</div>

<?php
    // Spit out JS below the footer
foreach ($this->getJs() as $js) {
    echo "<script src='".$js['file']."'></script>\n";
}
?>
</body>
</html>
