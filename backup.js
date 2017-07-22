<View style={styles.container} onLayout={this._onLayoutDidChange}>

    <Carousel
        delay={2000}
        style={this.state.size}
        autoplay
        pageInfo
        onAnimateNextPage={(p) => console.log(p)}
    >
        {this.renderPhotos()}
    </Carousel>
    <Button
        title="Pick an image from camera roll"
        onPress={this._pickImage}
    />
    {image &&
    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
</View>