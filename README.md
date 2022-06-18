# hi18n

HTML internationalization  

Uses the HTML tag's original text content as keys for loading translations from json files.  
  
```
npm i hi18n
```

Demo: https://inventivetalent.org/hi18n-test/
```html
<html>
    <body>
        <div>
            <span class="hi18n">Fowl stars lights dry green whales stars from signs.</span>
            <span class="hi18n">Be every his give grass dry fifth.</span>
            <span class="hi18n">Fly moving.</span>
            <span class="hi18n">May their made so lights darkness years.</span>
            <span class="hi18n">So gathering may from.</span>
            <span class="hi18n">Void signs man fowl fish moving.</span>
        </div>
        
        <script src="https://unpkg.com/hi18n@1.0.0/dist/bundle.js"></script>
        <script>
            new hi18n({
                auto: true // automatically translate on page load
            });
        </script>
    </body>
</html>
```
