/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module image-embed/imageembedcommand
 */

import Command from '@ckeditor/ckeditor5-core/src/command';
import { findOptimalInsertionPosition } from '@ckeditor/ckeditor5-widget/src/utils';
import { getSelectedImageModelWidget, insertImage } from './utils';

/**
 * The insert image command.
 *
 * The command is registered by the {@link module:image-embed/imageembedediting~ImageEmbedEditing} as `'imageEmbed'`.
 *
 * To insert image at the current selection, execute the command and specify the URL:
 *
 *		editor.execute( 'imageEmbed', 'http://url.to.the/image' );
 *
 * @extends module:core/command~Command
 */
export default class ImageEmbedCommand extends Command {
	/**
	 * @inheritDoc
	 */
	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const schema = model.schema;
		const position = selection.getFirstPosition();
		const selectedImage = getSelectedImageModelWidget( selection );

		let parent = position.parent;

		if ( parent != parent.root ) {
			parent = parent.parent;
		}

		this.value = selectedImage ? selectedImage.getAttribute( 'url' ) : null;
		this.isEnabled = schema.checkChild( parent, 'image' );
	}

	/**
	 * Executes the command, which either:
	 *
	 * * updates the URL of the selected image,
	 * * inserts the new image into the editor and puts the selection around it.
	 *
	 * @fires execute
	 * @param {String} url The URL of the image.
	 */
	execute( url ) {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedImage = getSelectedImageModelWidget( selection );

		if ( selectedImage ) {
			model.change( writer => {
				writer.setAttribute( 'url', url, selectedImage );
			} );
		} else {
			const insertPosition = findOptimalInsertionPosition( selection, model );

			insertImage( model, url, insertPosition );
		}
	}
}

