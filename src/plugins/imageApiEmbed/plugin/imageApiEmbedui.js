import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import imageIcon from '../theme/icons/image.svg';

export default class ImageApiEmbed extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'ImageApiEmbed';
	}
    init() {
        const editor = this.editor;
		if (typeof embedImageExecuted != "undefined") {
			embedImageExecuted(false);
		}
		window.executeEmbedImage = function (imageUrl) {
			editor.model.change( writer => {
				const imageElement = writer.createElement( 'image', {
					src: imageUrl
				} );

				// Insert the image in the current selection location.
				editor.model.insertContent( imageElement, editor.model.document.selection );
			});
		}
        editor.ui.componentFactory.add( 'imageApiEmbed', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Insert image',
                icon: imageIcon,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
				if (typeof embedImageExecuted != "undefined") {
					embedImageExecuted(true);
				}
				else{
					const imageUrl = prompt( 'Image URL' );
					if(imageUrl){
						executeEmbedImage(imageUrl);
					}

				}
            } );

            return view;
		} );

	}
}
