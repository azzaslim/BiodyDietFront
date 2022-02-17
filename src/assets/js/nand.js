<script>
    currentLinks = document.querySelectorAll('a[href="'+document.URL+'"]')
    currentLinks.forE‌​ach(function(link) {
        link.className += ' current-link'
    });
</script>