import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

export default class ImageEmbed extends Plugin {
    init() {
        const editor = this.editor;
		if (typeof embedImageExecuted != "undefined") {
			embedImageExecuted(false);
		}
		window.executeEmbedImage = {};
        editor.ui.componentFactory.add( 'imageEmbed', locale => {
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
					executeEmbedImage = function (imageUrl) {
						editor.model.change( writer => {
							const imageElement = writer.createElement( 'image', {
								src: imageUrl
							} );

							// Insert the image in the current selection location.
							editor.model.insertContent( imageElement, editor.model.document.selection );
						});
					}
				}
				else{
					const imageUrl = prompt( 'Image URL' );
					if(imageUrl){
						editor.model.change( writer => {
							const imageElement = writer.createElement( 'image', {
								src: imageUrl
							} );

							// Insert the image in the current selection location.
							editor.model.insertContent( imageElement, editor.model.document.selection );
						});
					}

				}
            } );

            return view;
        } );
    }
}
