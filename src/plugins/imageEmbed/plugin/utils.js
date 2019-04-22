/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module image-embed/utils
 */

import { isWidget, toWidget } from '@ckeditor/ckeditor5-widget/src/utils';

/**
 * Converts a given {@link module:engine/view/element~Element} to a image embed widget:
 * * Adds a {@link module:engine/view/element~Element#_setCustomProperty custom property} allowing to recognize the image widget element.
 * * Calls the {@link module:widget/utils~toWidget} function with the proper element's label creator.
 *
 * @param {module:engine/view/element~Element} viewElement
 * @param {module:engine/view/downcastwriter~DowncastWriter} writer An instance of the view writer.
 * @param {String} label The element's label.
 * @returns {module:engine/view/element~Element}
 */
export function toImageWidget( viewElement, writer, label ) {
	writer.setCustomProperty( 'image', true, viewElement );

	return toWidget( viewElement, writer, { label } );
}

/**
 * Returns a image widget editing view element if one is selected.
 *
 * @param {module:engine/view/selection~Selection|module:engine/view/documentselection~DocumentSelection} selection
 * @returns {module:engine/view/element~Element|null}
 */
export function getSelectedImageViewWidget( selection ) {
	const viewElement = selection.getSelectedElement();

	if ( viewElement && isImageWidget( viewElement ) ) {
		return viewElement;
	}

	return null;
}

/**
 * Checks if a given view element is a image widget.
 *
 * @param {module:engine/view/element~Element} viewElement
 * @returns {Boolean}
 */
export function isImageWidget( viewElement ) {
	return !!viewElement.getCustomProperty( 'image' ) && isWidget( viewElement );
}

/**
 * Creates a view element representing the image. Either "semantic" one for the data pipeline:
 *
 *		<figure class="image">
 *			<oembed url="foo"></oembed>
 *		</figure>
 *
 * or "non-semantic" (for the editing view pipeline):
 *
 *		<figure class="image">
 *			<div data-oembed-url="foo">[ non-semantic image preview for "foo" ]</div>
 *		</figure>
 *
 * @param {module:engine/view/downcastwriter~DowncastWriter} writer
 * @param {module:image-embed/imageregistry~ImageRegistry} registry
 * @param {String} url
 * @param {Object} options
 * @param {String} [options.useSemanticWrapper]
 * @param {String} [options.renderForEditingView]
 * @returns {module:engine/view/containerelement~ContainerElement}
 */
export function createImageFigureElement( writer, registry, url, options ) {
	const figure = writer.createContainerElement( 'figure', { class: 'image' } );

	// TODO: This is a hack. Without it, the figure in the data pipeline will contain &nbsp; because
	// its only child is the UIElement (wrapper).
	//
	// Note: The hack is a copy&paste from widget utils; it makes the figure act like it's a widget.
	figure.getFillerOffset = getFillerOffset;

	writer.insert( writer.createPositionAt( figure, 0 ), registry.getImageViewElement( writer, url, options ) );

	return figure;
}

/**
 * Returns a selected image element in the model, if any.
 *
 * @param {module:engine/model/selection~Selection} selection
 * @returns {module:engine/model/element~Element|null}
 */
export function getSelectedImageModelWidget( selection ) {
	const selectedElement = selection.getSelectedElement();

	if ( selectedElement && selectedElement.is( 'image' ) ) {
		return selectedElement;
	}

	return null;
}

/**
 * Creates a image element and inserts it into the model.
 *
 * **Note**: This method will use {@link module:engine/model/model~Model#insertContent `model.insertContent()`} logic of inserting content
 * if no `insertPosition` is passed.
 *
 * @param {module:engine/model/model~Model} model
 * @param {String} url An URL of an embeddable image.
 * @param {module:engine/model/position~Position} [insertPosition] Position to insert image. If not specified,
 * the default behavior of {@link module:engine/model/model~Model#insertContent `model.insertContent()`} will
 * be applied.
 */
export function insertImage( model, url, insertPosition ) {
	model.change( writer => {
		// const imageElement = writer.createElement( 'image', { url } );

		// model.insertContent( imageElement, insertPosition );

		// writer.setSelection( imageElement, 'on' );
		const imageElement = writer.createElement( 'image', {
			src: url
		} );

		// Insert the image in the current selection location.
		model.insertContent( imageElement, insertPosition );
	} );
	console.log(url);
}

function getFillerOffset() {
	return null;
}
