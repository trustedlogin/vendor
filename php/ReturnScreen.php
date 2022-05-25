<?php

namespace TrustedLogin\Vendor;
use TrustedLogin\Vendor\MenuPage;

class ReturnScreen {
    /**
     * @var array
     */
    protected $dependencies;
    /**
     * @var array
     */
    protected $loaded;

    /**
     * @var array
     */
    protected $primarayUrls;
    public function __construct(string $jsUrl, string $cssUrl,array $dependencies ){
        $this->dependencies = $dependencies;
        $this->loaded = [];
        $this->primarayUrls = [
            'js' => $jsUrl,
            'css' => $cssUrl
        ];
    }

    public function makeHtml(){
        $assetHtml = $this->buildAssets();
        return sprintf('<html lang="en-US"><head><title>%s</title>%s</head>%s</html>',
            __('TrustedLogin Acces Key Login', 'trustedlogin-vendor'),
            $assetHtml,
            $this->buildBody()
        );
    }

    public function buildBody(){
        return sprintf('<body><div id="%s"></div>%s</body>',
            MenuPage::REACT_ROOT_ID,
            $this->scriptTag($this->primarayUrls['js'],false).
            sprintf(
                '<link rel="stylesheet" id="%s" href="%s" type="text/css" media="all">',
                MenuPage::ASSET_HANDLE,
                $this->primarayUrls['css']
            )
        );
    }
    public function buildAssets(){
        $assetHtml = [];
        foreach ($this->dependencies as $handle) {
            if( \in_array($handle, $this->loaded) ){
                continue;
            }
            $asset = wp_scripts()->query($handle,true);
            if( ! $asset ){
                \var_dump($handle);exit;
            }
            if(!empty($asset->deps)){


                foreach ($asset->deps as $dep) {
                    $depAsset = wp_scripts()->query($dep,true);
                    if( ! $depAsset ){
                        continue;
                    }
                    $assetHtml[] = $this->scriptTag($depAsset->src);
                    $this->loaded[] = $dep;

                }

            }
            $assetHtml[] = $this->scriptTag($asset->src);
            $this->loaded[] = $handle;
        }
        $assetHtml = implode( "\n", $assetHtml);
        return $assetHtml;
    }

    /**
     * Create a script tag
     *
     * @param string $src Source URL for script
     * @param bool $prepend If true, the default, site_url($src) is used.
     */
    protected function scriptTag(string $src,bool $prepend = true ){
        if( $prepend ){
            $src = site_url($src);
        }
        return sprintf('<script src="%s"></script>',$src);
    }

}
